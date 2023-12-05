from OCC.Core.BRepBuilderAPI import BRepBuilderAPI_MakeEdge, BRepBuilderAPI_MakeWire
from OCC.Core.BRepAlgoAPI import BRepAlgoAPI_Fuse
from OCC.Core.STEPControl import STEPControl_Writer, STEPControl_AsIs
from OCC.Core.Interface import Interface_Static_SetCVal
from OCC.Core.IFSelect import IFSelect_RetDone

# Assuming we have loaded the shape into a TopoDS_Shape object named `a_shape`
# and we have the hole positions and diameters in a list of tuples named `holes`

for hole in holes:
    # Create a circle
    circle = gp_Circ(gp_Ax2(hole.position, gp_Dir(0, 0, 1)), hole.diameter / 2)
    # Create an edge from the circle
    edge = BRepBuilderAPI_MakeEdge(circle).Edge()
    # Create a wire from the edge
    wire = BRepBuilderAPI_MakeWire(edge).Wire()
    # Add the wire to the shape
    a_shape = BRepAlgoAPI_Fuse(a_shape, wire).Shape()

# To save the modified model, we can use STEPControl_Writer

step_writer = STEPControl_Writer()
Interface_Static_SetCVal("write.step.schema", "AP203")

status = step_writer.Transfer(a_shape, STEPControl_AsIs)

if status == IFSelect_RetDone:  # check status
    step_writer.Write("modified_model.stp")
