import random
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
import pygame

# Initialize Pygame
pygame.init()

# Create game window
screen_width = 200
screen_height = 150
screen = pygame.display.set_mode((screen_width, screen_height))
pygame.display.set_caption('Snake Game')

# Define colors
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
green = (0, 255, 0)

# Define game parameters
block_size = 20
clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 25)

# Define Snake class
class Snake:
    def __init__(self):
        self.length = 1
        self.positions = [((screen_width / 2), (screen_height / 2))]
        self.direction = random.choice([(0, -1), (0, 1), (-1, 0), (1, 0)])
        self.color = green

    def get_head_position(self):
        return self.positions[0]

    def turn(self, point):
        if self.length > 1 and (point[0] * -1, point[1] * -1) == self.direction:
            return
        else:
            self.direction = point

    def move(self):
        cur = self.get_head_position()
        x, y = self.direction
        new = (((cur[0] + (x * block_size)) % screen_width), (cur[1] + (y * block_size)) % screen_height)
        if len(self.positions) > 2 and new in self.positions[2:]:
            self.reset()
        else:
            self.positions.insert(0, new)
            if len(self.positions) > self.length:
                self.positions.pop()

    def reset(self):
        self.length = 1
        self.positions = [((screen_width / 2), (screen_height / 2))]
        self.direction = random.choice([(0, -1), (0, 1), (-1, 0), (1, 0)])

    def draw(self, surface):
        for p in self.positions:
            r = pygame.Rect((p[0], p[1]), (block_size, block_size))
            pygame.draw.rect(surface, self.color, r)
            pygame.draw.rect(surface, black, r, 1)

    def handle_keys(self):
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    self.turn((0, -1))
                elif event.key == pygame.K_DOWN:
                    self.turn((0, 1))
                elif event.key == pygame.K_LEFT:
                    self.turn((-1, 0))
                elif event.key == pygame.K_RIGHT:
                    self.turn((1, 0))

# Define Food class
class Food:
    def __init__(self):
        x = random.randint(0, screen_width - block_size)
        y = random.randint(0, screen_height - block_size)
        self.position = (x // block_size * block_size, y // block_size * block_size)
        self.color = red

    def draw(self, surface):
        r = pygame.Rect((self.position[0], self.position[1]), (block_size, block_size))
        pygame.draw.rect(surface, self.color, r)
        pygame.draw.rect(surface, black, r, 1)

# Define Deep Q-Network (DQN) class
class DQN(nn.Module):
    def __init__(self):
        super(DQN, self).__init__()
        self.fc1 = nn.Linear(4, 64)
        self.fc2 = nn.Linear(64, 64)
        self.fc3 = nn.Linear(64, 3)

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Define agent class
class Agent:
    def __init__(self):
        self.model = DQN()
        self.optimizer = optim.Adam(self.model.parameters(), lr=0.001)
        self.memory = []
        self.batch_size = 32
        self.gamma = 0.99
        self.eps_start = 1.0
        self.eps_end = 0.01
        self.eps_decay = 0.001
        self.steps_done = 0

    def select_action(self, state):
        sample = random.random()
        eps_threshold = self.eps_end + (self.eps_start - self.eps_end) * np.exp(-1.0 * self.steps_done * self.eps_decay)
        self.steps_done += 1
        if sample > eps_threshold:
            with torch.no_grad():
                state = torch.tensor(state, dtype=torch.float32)
                q_values = self.model(state)
                action = q_values.argmax().item()
        else:
            action = random.randint(0, 2)
        return action

    def optimize_model(self):
        if len(self.memory) < self.batch_size:
            return
        transitions = random.sample(self.memory, self.batch_size)
        batch = Transition(*zip(*transitions))
        non_final_mask = torch.tensor(tuple(map(lambda s: s is not None, batch.next_state)), dtype=torch.bool)
        non_final_next_states = torch.tensor([s for s in batch.next_state if s is not None], dtype=torch.float32)
        state_batch = torch.tensor(batch.state, dtype=torch.float32)
        action_batch = torch.tensor(batch.action, dtype=torch.int64)
        reward_batch = torch.tensor(batch.reward, dtype=torch.float32)
        state_action_values = self.model(state_batch).gather(1, action_batch.unsqueeze(1))
        next_state_values = torch.zeros(self.batch_size, dtype=torch.float32)
        next_state_values[non_final_mask] = self.model(non_final_next_states).max(1)[0].detach()
        expected_state_action_values = (next_state_values * self.gamma) + reward_batch
        loss = nn.functional.smooth_l1_loss(state_action_values, expected_state_action_values.unsqueeze(1))
        self.optimizer.zero_grad()
        loss.backward()
        self.optimizer.step()

# Define Transition class
class Transition:
    def __init__(self, state, action, next_state, reward):
        self.state = state
        self.action = action
        self.next_state = next_state
        self.reward = reward

    def __iter__(self):
        yield self.state
        yield self.action
        yield self.next_state
        yield self.reward

# Create Snake and Food
snake = Snake()
food = Food()

# Create agent
agent = Agent()

# Define game parameters
block_size = 5
clock = pygame.time.Clock()
font = pygame.font.SysFont(None, 25)
last_food_time = pygame.time.get_ticks()

# Game loop
reward = 0
while True:
    # Get current state
    state = [snake.get_head_position()[0], snake.get_head_position()[1], food.position[0], food.position[1]]

    # Select action
    action = agent.select_action(state)

    # Take action and get reward
    if action == 0:
        snake.turn((0, -1))
    elif action == 1:
        snake.turn((0, 1))
    elif action == 2:
        snake.turn((-1, 0))
    elif action == 3:
        snake.turn((1, 0))
    snake.move()

    # Calculate reward based on food distance
    food_distance = np.sqrt((snake.get_head_position()[0] - food.position[0]) ** 2 + (snake.get_head_position()[1] - food.position[1]) ** 2)
    if food_distance <= 10:
        reward += 10  # S
    elif food_distance <= 20:
        reward += 5  # C
    elif food_distance <= 60:
        reward += 1  # F
    else:
        reward -= 1  # VF

    if snake.get_head_position() == food.position:
        snake.length += 1
        food = Food()
        food_distance = np.sqrt((snake.get_head_position()[0] - food.position[0]) ** 2 + (snake.get_head_position()[1] - food.position[1]) ** 2)
        if food_distance <= 10:
            reward += 10  # S
        elif food_distance <= 20:
            reward += 5  # C
        elif food_distance <= 60:
            reward += 1  # F
        else:
            reward -= 1  # VF
        last_food_time = pygame.time.get_ticks()
    elif pygame.time.get_ticks() - last_food_time > 30000:
        reward -= 1
        last_food_time = pygame.time.get_ticks()

    # Get next state
    next_state = [snake.get_head_position()[0], snake.get_head_position()[1], food.position[0], food.position[1]]

    # Store transition in memory
    agent.memory.append(Transition(state, action, next_state, reward))

    # Optimize agent's model
    agent.optimize_model()
    #输出迭代次数
    print(agent.steps_done)

    # 输出reward
    print('reward'+reward.__str__())



    # Handle keys
    snake.handle_keys()

    # Draw game screen
    screen.fill(white)
    snake.draw(screen)
    food.draw(screen)

    # Draw score
    score_text = font.render("Score: {}".format(snake.length - 1), True, black)
    screen.blit(score_text, (5, 10))

    # Update screen
    pygame.display.update()

    # Control game speed
    clock.tick(120)