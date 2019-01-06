import axios from 'axios';
import { CRYPTOCOMPARE_WEBSITE, TOP_EXCHANGES, MIN_API_URL } from '../../config';
import { getSymbol } from '../../utils/Symbol';

const cryptoInfoAndExchanges = async (req, res) => {
  const { crypto = "BTC", symbol = 'USD', limit = 10} = req.query;
  const { data: { Data : { Exchanges, CoinInfo }}} = await axios.get(`${MIN_API_URL}${TOP_EXCHANGES}/full?fsym=${crypto}&tsym=${symbol}&limit=${limit}&api_key=${process.env.MIN_API_TOKEN}`);

  res.send({
    exchanges: Exchanges.map(market => ({
      name: market.MARKET,
      price: getSymbol(market.TOSYMBOL) + ` ` + market.PRICE,
      lastUpdate: new Date(market.LASTUPDATE),
      highLast24Hours: market.HIGH24HOUR
    })),
    coinInfo: {
      name: CoinInfo.Name,
      displayName: CoinInfo.FullName,
      imageUrl: `${CRYPTOCOMPARE_WEBSITE}${CoinInfo.ImageUrl}`,
      overviewUrl: `${CRYPTOCOMPARE_WEBSITE}${CoinInfo.Url}`,
      totalCoinsMined: CoinInfo.TotalCoinsMined
    }
  })
}

export { cryptoInfoAndExchanges } ;