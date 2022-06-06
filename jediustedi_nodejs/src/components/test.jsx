import { TableBody } from "@mui/material";
import { EnhancedTableToolbar, EnhancedTableHead } from "@mui/material/Table";

function test() {
  return (
    <div>
      <EnhancedTableToolbar />
      <Table>
        <EnhancedTableHead />
        <TableBody></TableBody>
      </Table>
    </div>
  );
}

export default test;
