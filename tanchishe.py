import pygame
import random
import sys

# Initialize Pygame
pygame.init()

# Create game window
screen_width = 800
screen_height = 600
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

# Create Snake and Food
snake = Snake()
food = Food()

# Game loop
while True:
    snake.handle_keys()
    snake.move()

    # Check if Snake has eaten Food
    if snake.get_head_position() == food.position:
        snake.length += 1
        food = Food()

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
    clock.tick(10)