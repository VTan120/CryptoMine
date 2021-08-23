import React, { useState, useEffect } from "react";
import Coin from "../components/Coin";
import "../styles/HomeScreen.css";
import { Dropdown, Form, Row, Table } from "react-bootstrap";
import { listCoins } from "../actions/coinActions";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
// import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SelectCurrency from "react-select-currency";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "@material-ui/lab/Pagination";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function HomeScreen() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [pageSize, setPageSize] = useState(100);
  const [sort, setSort] = useState(true);

  const dispatch = useDispatch();
  const coinList = useSelector((state) => state.coinList);
  const { error, loading, coins } = coinList;

  useEffect(async () => {
    dispatch(listCoins(page, currencyCode, pageSize));
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/list`);
    // const { data } = await axios.get(
    //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100$page=3&sparkline=true&price_change_percentage=7d`
    // );
    // console.log(data);
    console.log(res);
  }, [dispatch, page, currencyCode, pageSize]);

  let filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h2 className="coin-text">
          Today's Cryptocurrency Prices by Market Cap
        </h2>
        <Form className="search-box d-flex">
          <Form.Control
            type="text"
            name="q"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          ></Form.Control>
        </Form>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage variant="danger">{error}</ErrorMessage>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <label>Select currency: </label> &nbsp;
            <SelectCurrency
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              // onCurrencySelected={onSelectedCurrency}
              style={{ marginRight: "50px" }}
            />
            <Dropdown>
              <label>Show rows: </label> &nbsp;
              <Dropdown.Toggle
                variant="info"
                id="dropdown-basic"
                style={{ padding: "4px 8px" }}
              >
                {pageSize}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setPageSize(200)}>
                  200
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPageSize(100)}>
                  100
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPageSize(50)}>
                  50
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPageSize(10)}>
                  10
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <Tabs defaultActiveKey="live_value" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="live_value" title="Live Value">
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>
                      #{" "}
                      {sort ? (
                        <Link to="">
                          <i
                            className="fas fa-chevron-down"
                            onClick={() => setSort(false)}
                          ></i>
                        </Link>
                      ) : (
                        <Link to="">
                          <i
                            className="fas fa-chevron-up"
                            onClick={() => setSort(true)}
                          ></i>
                        </Link>
                      )}
                    </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>24h %</th>
                    <th>7d %</th>
                    <th>Market Cap</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>Last 7 days</th>
                  </tr>
                </thead>
                <tbody>
                  {sort
                    ? filteredCoins.map((coin, index) => {
                      return (
                        <Coin
                          _id={coin.market_cap_rank}
                          key={coin.id}
                          name={coin.name}
                          price={coin.current_price}
                          symbol={coin.symbol}
                          marketcap={coin.market_cap}
                          volume={coin.total_volume}
                          image={coin.image}
                          pricechange24h={coin.price_change_percentage_24h}
                          pricechange7d={
                            coin.price_change_percentage_7d_in_currency
                          }
                          circulatingsupply={coin.circulating_supply}
                          graphdata={coin.sparkline_in_7d}
                          code={currencyCode}
                        />
                      );
                    })
                    : filteredCoins.reverse().map((coin, index) => {
                      return (
                        <Coin
                          _id={coin.market_cap_rank}
                          key={coin.id}
                          name={coin.name}
                          price={coin.current_price}
                          symbol={coin.symbol}
                          marketcap={coin.market_cap}
                          volume={coin.total_volume}
                          image={coin.image}
                          pricechange24h={coin.price_change_percentage_24h}
                          pricechange7d={
                            coin.price_change_percentage_7d_in_currency
                          }
                          circulatingsupply={coin.circulating_supply}
                          graphdata={coin.sparkline_in_7d}
                          code={currencyCode}
                        />
                      );
                    })}
                </tbody>
              </Table>
              <Pagination
                count={Math.floor(9100 / pageSize)}
                page={page}
                onChange={handleChange}
                size="large"
                variant="outlined"
                color="primary"
                showFirstButton
                showLastButton
              />
            </Tab>
            <Tab eventKey="categories" title="Categories" >
              {/* <img src="x" onError={() => window.location.replace("http://localhost:3000/category")}></img> */}
            </Tab>
            <Tab eventKey="prediction" title="Prediction" disabled>
              <h1>Hello</h1>
            </Tab>
          </Tabs>
          {/* <Pagination>
            {[...Array(Math.floor(40)).keys()].map((x) => (
              <LinkContainer
                key={x + 1}
                to={`/`}
                onClick={() => setPage(x + 1)}
              >
                <Pagination.Item active={x + 1 === page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination> */}
        </>
      )}
    </div>
  );
}

export default HomeScreen;
