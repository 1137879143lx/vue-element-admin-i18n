import cv2

# 定义回调函数
def on_trackbar(val):
    global thresh_value
    thresh_value = val
    edges = cv2.Canny(gray, thresh_value, thresh_value * 2)  # 使用 Canny 边缘检测算法检测边缘
    contours, hierarchy = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)  # 使用轮廓检测算法检测轮廓
    img_contours = img.copy()  # 复制原图像
    for contour in contours:
        area = cv2.contourArea(contour)  # 计算轮廓面积
        if area < 100:  # 如果轮廓面积小于 50，则忽略该轮廓
            continue
        cv2.drawContours(img_contours, [contour], -1, (0, 255, 0), 2)  # 在图像上绘制轮廓
        M = cv2.moments(contour)  # 计算轮廓的矩
        cx = int(M['m10'] / M['m00'])  # 计算轮廓的中心点 x 坐标
        cy = int(M['m01'] / M['m00'])  # 计算轮廓的中心点 y 坐标
        cv2.circle(img_contours, (cx, cy), 5, (255, 0, 0), -1)  # 在中心点处绘制一个蓝色圆圈
        print(cx, cy)  # 输出中心点坐标

    cv2.imshow('Contours', img_contours)  # 在窗口中显示绘制好轮廓的图像
    cv2.imshow('edges', edges)  # 在窗口中显示绘制好轮廓的图像

# 加载图像
img = cv2.imread('image10.png')

# 将图像转换为灰度图像
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 创建窗口和滑动条
cv2.namedWindow('Threshold Adjust')
cv2.createTrackbar('Threshold', 'Threshold Adjust', 100, 255, on_trackbar)

# 初始化阈值
thresh_value = 100

# 显示图像和窗口
cv2.imshow('Image', img)
cv2.imshow('Threshold Adjust', gray)
cv2.waitKey(0)
cv2.destroyAllWindows()