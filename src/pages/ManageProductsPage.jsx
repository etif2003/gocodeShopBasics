import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ProductForm from "../components/manager/ProductForm";
import { Link } from "react-router";
import {
  addProduct,
  deleteProduct,
  handleProducts,
  updateProduct,
} from "../api/products-functions";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { Box } from "@mui/material";
import { useState } from "react";

const columns = [
  { id: "_id", label: "Id" },
  { id: "title", label: "Title" },
  { id: "price", label: "Price", align: "center" },
  { id: "category", label: "Category" },
  { id: "image", label: "Image" },
  { id: "rate", label: "Rating (Rate)", align: "center", minWidth: 95 },
  { id: "count", label: "Rating (Count)", align: "center", minWidth: 95 },
  { id: "actions", label: "Actions", align: "center" },
];

export default function ManageProductsPage() {
  const queryClient = useQueryClient();

  const { data: allProducts = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: handleProducts,
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const visibleRows = allProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // modal state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("add"); // "add" | "edit"
  const [selected, setSelected] = useState(null); // product

  const openAdd = () => {
    setMode("add");
    setSelected(null);
    setOpen(true);
  };

  const openEdit = (product) => {
    setMode("edit");
    setSelected(product);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleSubmitModal = async (payload) => {
    try {
      if (mode === "add") {
        await addProduct(payload); // POST
      } else {
        await updateProduct(selected._id, payload); // PUT
      }
      queryClient.invalidateQueries(["all-products"]);

      setOpen(false);
    } catch (e) {
      alert(e.message || "Request failed");
    }
  };

  const handleDelete = async (product) => {
    const id = product._id;
    const ok = window.confirm(`Delete product "${product.title}"?`);
    if (!ok) return;

    try {
      await deleteProduct(id); // DELETE
      queryClient.invalidateQueries(["all-products"]);
    } catch (e) {
      alert(e.message || "Delete failed");
    }
  };

  return (
    <div>
      <Link to={"/"}>
        <ArrowBackIcon className="link-back-home" />
      </Link>
      <div
        style={{
          margin: "25px 35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "32px", fontWeight: 500 }}>Admin - Products</h2>
        <Button
          style={{ maxHeight: 53, padding: "6px 16px" }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openAdd}
        >
          Add Product
        </Button>
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 485 }}>
          <Table stickyHeader aria-label="admin products table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((product) => (
                <TableRow hover tabIndex={-1} key={product._id}>
                  {columns.map((column) => {
                    let value;

                    if (column.id === "rate") value = product.rating?.rate;
                    else if (column.id === "count")
                      value = product.rating?.count;
                    else value = product[column.id];

                    if (column.id === "image") {
                      return (
                        <TableCell key={column.id}>
                          {value ? (
                            <img
                              src={value}
                              alt={product.title}
                              style={{ width: 40 }}
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      );
                    }

                    if (column.id === "actions") {
                      return (
                        <TableCell key={column.id} align="right">
                          <Box display="flex" gap={1} justifyContent="flex-end">
                            <Tooltip title="Edit">
                              <IconButton
                                style={{ color: "var(--color-primary)" }}
                                onClick={() => openEdit(product)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                style={{ color: "red" }}
                                onClick={() => handleDelete(product)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value ?? "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        <ProductForm
          open={open}
          mode={mode}
          initialProduct={selected}
          onClose={closeModal}
          onSubmit={handleSubmitModal}
        />
      </Paper>
    </div>
  );
}
