import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import DialogBox from '../components/DialogBox';
import Filters from '../components/Filters';
import CircularProgress from '@mui/material/CircularProgress';

const MarketListPage = () => {
  const [marketList, setMarketList] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [checked, setChecked] = useState(new Array(5).fill(true));

  useEffect(() => {
    const fetchMarketList = () => {
      setIsLoading((prev) => !prev);
      fetch(
        'https://yfapi.net/v6/finance/quote/marketSummary?lang=en&region=US',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.REACT_APP_API_KEY,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setIsLoading((prev) => !prev);
          setMarketList(data.marketSummaryResponse.result);
        })
        .catch((error) => {
          setIsLoading((prev) => !prev);
          setError(error.message);
        });
    };
    fetchMarketList();
  }, []);
  const handleOpenDialog = (idx) => {
    setSelectedItem(marketList[idx]);
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(false);
  };
  if (error) {
    return (
      <Grid container justifyContent='center' pt={5}>
        <Typography variant='h3'>{error}</Typography>
      </Grid>
    );
  }
  if (isLoading)
    return (
      <Grid pt={5} style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Grid>
    );

  return (
    <Grid container justifyContent='center'>
      <Grid
        mt={3}
        item
        sx={{
          justifyContent: 'center',
          display: 'flex',
          backgroundColor: '#f9f9f9',
          width: '100%',
        }}
      >
        <Filters checked={checked} setChecked={setChecked} />
      </Grid>
      <Grid
        container
        justifyContent='start'
        alignItems='stretch'
        py={3}
        spacing={2}
        px={2}
      >
        {marketList.map((item, idx) => (
          <Grid item key={idx} sm={6} md={4} lg={3}>
            <Grid
              container
              textAlign='center'
              justifyContent='stretch'
              alignItems='stretch'
              sx={{ backgroundColor: '#f4f4f4', width: '100%', height: '100%' }}
            >
              <Grid item py={1} xs={12}>
                <Typography
                  sx={{ fontWeight: '600' }}
                  variant='h5'
                  component='div'
                >
                  {item.shortName}
                </Typography>
                <Typography variant='cardBody' component='span'>
                  <span>{item.symbol}</span>
                </Typography>
              </Grid>
              {checked[0] && (
                <Grid
                  item
                  py={1}
                  xs={6}
                  sx={{ borderBottom: '2px solid white' }}
                >
                  <Typography component={'p'} variant='cardTitle'>
                    Market change
                  </Typography>
                  <Typography component={'p'} variant='cardBody'>
                    <span style={{ fontWeight: '800' }}>fmt:</span>{' '}
                    {item.regularMarketChange.fmt} <br />{' '}
                    <span style={{ fontWeight: '800' }}>raw:</span>{' '}
                    {item.regularMarketChange.raw}
                  </Typography>
                </Grid>
              )}
              {checked[1] && (
                <Grid
                  item
                  py={1}
                  xs={6}
                  sx={{
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid white',
                  }}
                >
                  <Typography component={'p'} variant='cardTitle'>
                    Change Percent
                  </Typography>
                  <Typography component={'p'} variant='cardBody'>
                    <span style={{ fontWeight: '800' }}>fmt:</span>{' '}
                    {item.regularMarketChangePercent.fmt} <br />
                    <span style={{ fontWeight: '800' }}>raw:</span>{' '}
                    {item.regularMarketChangePercent.raw}
                  </Typography>
                </Grid>
              )}
              {checked[2] && (
                <Grid
                  item
                  py={1}
                  xs={6}
                  sx={{ borderBottom: '2px solid white' }}
                >
                  <Typography component={'p'} variant='cardTitle'>
                    Market Price
                  </Typography>
                  <Typography component={'p'} variant='cardBody'>
                    <span style={{ fontWeight: '800' }}>fmt:</span>{' '}
                    {item.regularMarketPrice.fmt} <br />{' '}
                    <span style={{ fontWeight: '800' }}>raw:</span>{' '}
                    {item.regularMarketPrice.raw}
                  </Typography>
                </Grid>
              )}
              {checked[3] && (
                <Grid
                  item
                  py={1}
                  xs={6}
                  sx={{
                    borderLeft: '2px solid white',
                    borderBottom: '2px solid white',
                  }}
                >
                  <Typography component={'p'} variant='cardTitle'>
                    Previous Close
                  </Typography>
                  <Typography component={'p'} variant='cardBody'>
                    <span style={{ fontWeight: '800' }}>fmt:</span>{' '}
                    {item.regularMarketPreviousClose.fmt} <br />
                    <span style={{ fontWeight: '800' }}>raw:</span>{' '}
                    {item.regularMarketPreviousClose.raw}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12} sx={{ backgroundColor: '#eaeaea' }}>
                <Button
                  fullWidth
                  size='large'
                  onClick={() => handleOpenDialog(idx)}
                >
                  See More
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <DialogBox
        item={selectedItem}
        open={dialogOpen}
        onClose={handleCloseDialog}
      />
    </Grid>
  );
};

export default MarketListPage;
