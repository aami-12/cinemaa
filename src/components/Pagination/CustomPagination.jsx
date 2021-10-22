import { createTheme, ThemeProvider } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

const CustomPagination = ({ setpage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setpage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePreviousButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
