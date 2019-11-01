// eslint-disable-next-line no-unused-vars
import React from 'react';

import AionIcon from './aion.svg';
import BTCIcon from './btc.svg';
import EQLIcon from './eqli.svg';
import ETHIcon from './eth.svg';
import CHIPSIcon from './chips.svg';
import RDNIcon from './rdn.svg';
import LTCIcon from './ltc.svg';
import NEOIcon from './neo.svg';
import OMGIcon from './omg.svg';
import WAVESIcon from './waves.svg';
import KNCIcon from './knc.svg';
import EOSIcon from './eos.svg';
import BNBIcon from './bnb.svg';
import BCHIcon from './bch.svg';
import XLMIcon from './xlm.svg';
import XRPIcon from './xrp.svg';
import ZILIcon from './zil.svg';
import NANOIcon from './nano.svg';
import USDTIcon from './usdt.svg';
import MONEROIcon from './xmr.svg';
import CARDANOIcon from './ada.svg';
import KMDIcon from './kmd.svg';
import UNKNOWIcon from './unknow.svg';
import COQUIIcon from './coqui.svg';
import BEERIcon from './beer.svg';
import PIZZAIcon from './pizza.svg';

export {
  AionIcon as AION,
  BTCIcon as BTC,
  EQLIcon as EQL,
  ETHIcon as ETH,
  CHIPSIcon as CHIPS,
  BCHIcon as BCH,
  BNBIcon as BNB,
  EOSIcon as EOS,
  KNCIcon as KNC,
  LTCIcon as LTC,
  NEOIcon as NEO,
  OMGIcon as OMG,
  WAVESIcon as WAVES,
  XRPIcon as XRP,
  XLMIcon as XLM,
  RDNIcon as RDN,
  ZILIcon as ZIL,
  NANOIcon as NANO,
  USDTIcon as USDT,
  MONEROIcon as XMR,
  CARDANOIcon as ADA,
  KMDIcon as KMD,
  UNKNOWIcon as UNKNOW,
  COQUIIcon as COQUI,
  BEERIcon as BEER,
  PIZZAIcon as PIZZA
};

const coins = {
  aion: AionIcon,
  btc: BTCIcon,
  eql: EQLIcon,
  eth: ETHIcon,
  chips: CHIPSIcon,
  bch: BCHIcon,
  bnb: BNBIcon,
  eos: EOSIcon,
  knc: KNCIcon,
  ltc: LTCIcon,
  neo: NEOIcon,
  omg: OMGIcon,
  waves: WAVESIcon,
  xrp: XRPIcon,
  xlm: XLMIcon,
  rdn: RDNIcon,
  zil: ZILIcon,
  nano: NANOIcon,
  usdt: USDTIcon,
  xmr: MONEROIcon,
  ada: CARDANOIcon,
  kmd: KMDIcon,
  unknow: UNKNOWIcon,
  coqui: COQUIIcon,
  beer: BEERIcon,
  pizza: PIZZAIcon,

  AION: AionIcon,
  BTC: BTCIcon,
  EQL: EQLIcon,
  ETH: ETHIcon,
  CHIPS: CHIPSIcon,
  BCH: BCHIcon,
  BNB: BNBIcon,
  EOS: EOSIcon,
  KNC: KNCIcon,
  LTC: LTCIcon,
  NEO: NEOIcon,
  OMG: OMGIcon,
  WAVES: WAVESIcon,
  XRP: XRPIcon,
  XLM: XLMIcon,
  RDN: RDNIcon,
  ZIL: ZILIcon,
  NANO: NANOIcon,
  USDT: USDTIcon,
  XMR: MONEROIcon,
  ADA: CARDANOIcon,
  KMD: KMDIcon,
  UNKNOW: UNKNOWIcon,
  COQUI: COQUIIcon,
  BEER: BEERIcon,
  PIZZA: PIZZAIcon
};

const coinsRender = {
  aion: <AionIcon />,
  btc: <BTCIcon />,
  eql: <EQLIcon />,
  eth: <ETHIcon />,
  chips: <CHIPSIcon />,
  bch: <BCHIcon />,
  bnb: <BNBIcon />,
  eos: <EOSIcon />,
  knc: <KNCIcon />,
  ltc: <LTCIcon />,
  neo: <NEOIcon />,
  omg: <OMGIcon />,
  waves: <WAVESIcon />,
  xrp: <XRPIcon />,
  xlm: <XLMIcon />,
  rdn: <RDNIcon />,
  zil: <ZILIcon />,
  nano: <NANOIcon />,
  usdt: <USDTIcon />,
  xmr: <MONEROIcon />,
  ada: <CARDANOIcon />,
  kmd: <KMDIcon />,
  unknow: <UNKNOWIcon />,
  coqui: <COQUIIcon />,
  beer: <BEERIcon />,
  pizza: <PIZZAIcon />,

  AION: <AionIcon />,
  BTC: <BTCIcon />,
  EQL: <EQLIcon />,
  ETH: <ETHIcon />,
  CHIPS: <CHIPSIcon />,
  BCH: <BCHIcon />,
  BNB: <BNBIcon />,
  EOS: <EOSIcon />,
  KNC: <KNCIcon />,
  LTC: <LTCIcon />,
  NEO: <NEOIcon />,
  OMG: <OMGIcon />,
  WAVES: <WAVESIcon />,
  XRP: <XRPIcon />,
  XLM: <XLMIcon />,
  RDN: <RDNIcon />,
  ZIL: <ZILIcon />,
  NANO: <NANOIcon />,
  USDT: <USDTIcon />,
  XMR: <MONEROIcon />,
  ADA: <CARDANOIcon />,
  KMD: <KMDIcon />,
  UNKNOW: <UNKNOWIcon />,
  COQUI: <COQUIIcon />,
  BEER: <BEERIcon />,
  PIZZA: <PIZZAIcon />
};

export function getCoinIcon(symbol) {
  const c = coinsRender[symbol];
  if (c) {
    return c;
  }
  return coinsRender.UNKNOW;
}

export default coins;
