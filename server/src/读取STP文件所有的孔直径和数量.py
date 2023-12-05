from OCC.Core.STEPControl import STEPControl_Reader, STEPControl_Writer
from OCC.Core.IFSelect import IFSelect_RetDone, IFSelect_ItemsByEntity
from OCC.Core.TCollection import TCollection_AsciiString
from OCC.Core.BRepTools import breptools_Read
from OCC.Core.BRep import BRep_Builder
from OCC.Core.TopAbs import TopAbs_FACE
from OCC.Core.TopExp import TopExp_Explorer
from OCC.Core.BRepAdaptor import BRepAdaptor_Curve
from OCC.Core.GeomAbs import GeomAbs_Circle
from OCC.Core.TopoDS import topods_Edge, topods_Face, TopoDS_Compound
from OCC.Core.TopAbs import TopAbs_EDGE
from OCC.Core.BRepBuilderAPI import BRepBuilderAPI_MakeEdge
from OCC.Core.BRepPrimAPI import BRepPrimAPI_MakeRevol
from OCC.Core.gp import gp_Ax1, gp_Pnt, gp_Dir
from collections import defaultdict
from OCC.Core.BRepAdaptor import BRepAdaptor_Surface
from OCC.Core.STEPControl import STEPControl_AsIs


def get_holes_from_step_file(filename):
    step_reader = STEPControl_Reader()
    status = step_reader.ReadFile(filename)

    if status == IFSelect_RetDone:  # check status
        failsonly = False
        step_reader.PrintCheckLoad(failsonly, IFSelect_RetDone)
        step_reader.PrintCheckTransfer(failsonly, IFSelect_RetDone)
        step_reader.TransferRoot(1)
        nbr = step_reader.NbShapes()
        a_shape = step_reader.OneShape()

    # data structure to hold diameters of holes
    diameters = []

    # data structure to hold centers of holes
    centers = {}

    # data structure to hold circles
    circles = []

    # iterate over all faces in the shape
    face_explore = TopExp_Explorer(a_shape, TopAbs_FACE)
    while face_explore.More():
        face = topods_Face(face_explore.Current())
        edge_explore = TopExp_Explorer(face, TopAbs_EDGE)
        while edge_explore.More():
            edge = topods_Edge(edge_explore.Current())
            curve_adaptor = BRepAdaptor_Curve(edge)
            if curve_adaptor.GetType() == GeomAbs_Circle:
                circle = curve_adaptor.Circle()
                center = (
                    circle.Location().X(),
                    circle.Location().Y(),
                    circle.Location().Z(),
                )

                diameter = circle.Radius() * 2
                if center not in centers and diameter > 0:
                    diameters.append(diameter)
                    centers[center] = True
                    circles.append(circle)
                    # print(center, diameter)
            edge_explore.Next()
        face_explore.Next()

    # count the number of each diameter
    diameter_counts = defaultdict(int)
    for diameter in diameters:
        diameter_counts[diameter] += 1

    return diameter_counts, circles


def save_circles_as_step(circles, filename):
    compound = TopoDS_Compound()
    builder = BRep_Builder()
    builder.MakeCompound(compound)

    for circle in circles:
        edge = BRepBuilderAPI_MakeEdge(circle).Edge()
        builder.Add(compound, edge)

    step_writer = STEPControl_Writer()
    step_writer.Transfer(compound, STEPControl_AsIs)
    status = step_writer.Write(filename)

    if status == IFSelect_RetDone:
        print("Successfully wrote ", filename)
    else:
        print("Error writing ", filename)


# usage
filename = r"C:\Users\Administrator\Desktop\KONG4.stp"
hole_diameters, circles = get_holes_from_step_file(filename)
for diameter, count in hole_diameters.items():
    print(f"Diameter: {diameter}, Count: {count}")

# save_circles_as_step(circles, r"C:\Users\Administrator\Desktop\_体孔_modified.stp")
