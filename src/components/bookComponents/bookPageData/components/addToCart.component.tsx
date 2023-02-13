import {
  Box,
  Button,
  ButtonProps,
  Modal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { FunctionComponent, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { BookModel } from "../../../../api/models/book.model";
import { useCartContext } from "../../../../utils/utils";
import { useNavigate } from "react-router-dom";

const style: SxProps<Theme> = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  minHeight: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

interface AddToCartProps extends ButtonProps {
  book: BookModel;
}

const AddToCart: FunctionComponent<AddToCartProps> = ({ book, ...props }) => {
  const { addToCart } = useCartContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleOnClick = () => {
    handleOpen();
    addToCart(book);
  };

  return (
    <div>
      <Button
        variant="contained"
        className="mt-3 mx-3"
        style={{ width: "80%" }}
        onClick={handleOnClick}
        {...props}
      >
        <AddShoppingCartIcon /> Add to cart
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            The product has been added to cart
          </Typography>
          <Typography
            component="h3"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
              <Box
                component="img"
                src={book.imageURLS}
                sx={{ height: "100px", width: "auto" }}
              />
              <Box>
                <Typography variant="h6" sx={{}}>
                  {book.title}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  {book.author}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ mb: 3, ml: "auto" }}>
                {book.price + 0.99} lei
              </Typography>
            </Box>

            <Button variant="contained" onClick={() => navigate("/cart")}>
              Go To Cart
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AddToCart;
