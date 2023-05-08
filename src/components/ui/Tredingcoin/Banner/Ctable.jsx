import {
  createTheme,
  makeStyles,
  TableHead,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import {
  Container,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Navigate, useNavigate } from "react-router-dom";
import { CoinList, HistoricalChart } from "../api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../Tredingcoin";
import { Line } from "react-chartjs-2";

const Ctable = () => {
  const [coin, setcoin] = useState([]);
  const [loading, setloading] = useState(false);
  const [Search, setSearch] = useState();
  const [page, setpage] = useState(1);
  const { currency, symbol } = CryptoState();
  const [historic, sethistoric] = useState([]);
  const [days, setdays] = useState(7);
  const history = useNavigate();

  const Chartdatastore = [];
  const fetchcoins = async () => {
    setloading(true);
    const { data } = await axios
      .get(CoinList(currency))
      .catch(function (error) {
        console.log(error);
      });
    //   console.log("this is data",data);
    setcoin(data);
    setloading(false);
  };
  // console.log("this is coin",coin);
  const fetchchart = async () => {
    const { data } = await axios.get(
      HistoricalChart("bitcoin", days, currency)
    );
    console.log("this is chart ", data.prices);
    sethistoric(data.prices);
  };
  // fetchchart()
  useEffect(() => {
    fetchcoins();
    // fetchchart()
  }, [currency]);
  // useEffect(() => {

  // }, [currency,days])

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSerch = () => {
    if (Search == undefined) {
      return coin;
    }
    return coin.filter(
      (coin1) =>
        coin1.name.toLowerCase().includes(Search) ||
        coin1.symbol.toLowerCase().includes(Search)
    );
  };
  // console.log("this is ",Chartdatastore.forEach((coin)=>{ return coin}));
  const usestyles = makeStyles({
    row: {
      height: "10%",
      width: "10%",
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
  });

  const classes = usestyles();
  return (
    <ThemeProvider>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h6"
          style={{ margin: 18, fontFamily: "Montserrat", color: "white" }}
        >
          List of CryptoCurrncy
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="filled"
          style={{ marginBottom: 20, width: "100%", backgroundColor: "white" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D", height: "10px" }}>
                <TableRow style={{ height: "0px" }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "800",
                        fontFamily: "Montserrat",
                        height: "20px",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSerch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row, i) => {
                    // console.log(i);
                    const profit = row.price_change_percentage_24h > 0;
                    console.log(row.id);
                    const data1 = async () => {
                      const { data } = await axios.get(
                        HistoricalChart(row.id, days, currency)
                      );
                      Chartdatastore.push(data.prices);
                      // sethistoric(data.prices)
                      // return data.prices
                    };
                    // const hello= data1()
                    data1();

                    // console.log( "this is chart ",data.prices);
                    // Chartdatastore.push(data.prices)
                    // const chartdata=Chartdatastore[0]

                    // sethistoric(data.prices)
                    // const datafull=[0].sparkline_in_7d.price
                    return (
                      <TableRow
                        // onClick={() =>window.location.href=`https://coinmarketcap.com/currencies/${row.id}/`}
                        onClick={() => history(`/Chart/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex", gap: 15 }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                color: "white",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{ color: "white" }}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        {/* <TableCell width="30%">
                                                            <Line style={{hight:"10px"}}
                                                                data={{
                                                                    labels: historic.map((coin) => {
                                                                        let date = new Date(coin[0]);
                                                                        let time =
                                                                        date.getHours() > 12
                                                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                                            : `${date.getHours()}:${date.getMinutes()} AM`;
                                                                        return days == 1 ? time : date.toLocaleDateString();
                                                                    }),

                                                                    datasets: [
                                                                        {
                                                                        data: historic.map((coin) => coin[1]),
                                                                        label: `Price ( Past ${days} Days ) in ${currency}`,
                                                                        borderColor: "#EEBC1D",
                                                                        },
                                                                    ],
                                                                    }}
                                                                
                                                                /> 
                                                            </TableCell> */}
                      </TableRow>
                    );
                  })}
                <TableRow></TableRow>
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSerch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setpage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Ctable;
