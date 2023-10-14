from OCC.Core.STEPControl import STEPControl_Reader
from OCC.Core.BRepBndLib import brepbndlib_Add
from OCC.Core.Bnd import Bnd_Box
from OCC.Core.BRepGProp import brepgprop_SurfaceProperties, brepgprop_VolumeProperties
from OCC.Core.GProp import GProp_GProps
import json
from OCC.Display.SimpleGui import init_display


def read_shape_from_stp(stp_filename):
    """Read shape from STP file."""
    step_reader = STEPControl_Reader()
    step_reader.ReadFile(stp_filename)
    step_reader.TransferRoot(1)
    shape = step_reader.Shape(1)
    return shape


def compute_surface_area(shape):
    """Compute surface area of the shape."""
    props = GProp_GProps()
    brepgprop_SurfaceProperties(shape, props)
    return props.Mass()


def compute_volume(shape):
    """Compute volume of the shape."""
    props = GProp_GProps()
    brepgprop_VolumeProperties(shape, props)
    return props.Mass()


def compute_dimensions(shape):
    """Compute dimensions of the shape (length, width, height)."""
    bbox = Bnd_Box()
    brepbndlib_Add(shape, bbox)
    xmin, ymin, zmin, xmax, ymax, zmax = bbox.Get()
    return xmax - xmin, ymax - ymin, zmax - zmin


if __name__ == "__main__":

    display, start_display, add_menu, add_function_to_menu = init_display()  # 初始化显示

    # 读取STP文件中的形状
    filename = r"C:\Users\Administrator\Desktop\_model106.stp"
    my_shape = read_shape_from_stp(filename)

    display.DisplayShape(my_shape)  # 显示形状
    # 适应视图，确保形状全部显示在屏幕上
    display.FitAll()

    # 保存为图像
    image_filename = r"C:\Users\Administrator\Desktop\shape_image.png"
    display.View.Dump(image_filename)

    area = round(compute_surface_area(my_shape), 2)
    volume = round(compute_volume(my_shape), 2)
    length, width, height = compute_dimensions(my_shape)
    length, width, height = round(length, 2), round(
        width, 2), round(height, 2)

    # Assuming a specific material density (e.g., steel with density 7.85 g/cm^3)
    density = 7.85  # g/cm^3
    weight = round((density * volume) / 1000000, 2)  # kg

    # 计算基于零件长*宽*高的“方块”体积和重量
    block_volume = round((length+10) * (width+10) * (height+10), 2)
    block_weight = round((density * block_volume) / 1000000, 2)  # kg

    # 保存结果到字典中
    results = {
        "area": area,
        "volume": volume,
        "dimensions": {
            "length": length,
            "width": width,
            "height": height
        },
        "block_dimensions": {
            "length": length+10,
            "width": width+10,
            "height": height+10
        },
        "weight(KG)": round(weight, 2),
        "block_weight(KG)": round(block_weight, 2)  # 新增基于长*宽*高的“方块”重量
    }

    # 输出JSON格式的结果
    print(json.dumps(results, indent=4))
    # 如果你希望视窗保持打开状态，可以使用下面的方法
    # start_display()
