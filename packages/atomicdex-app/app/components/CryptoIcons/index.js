// @flow
// eslint-disable-next-line no-unused-vars
/**
 * Update file scripts
 *
 * var fs = require('fs');
 * fs.readdir('./app/components/CryptoIcons', function(err, files) {
 *  const imports = files.map(e => `import ${e.split('.').slice(0, -1).join('.').toUpperCase()} from './${e};`);
 *  for(let i = 0; i < imports.length; i+=1) {
 *    console.log(imports[i]);
 *  }
 * });
 *
 */

import React from 'react';
import { memoize } from 'barterdex-utilities';

import $PAC from './$pac.svg';
import ABT from './abt.svg';
import ACT from './act.svg';
import ACTN from './actn.svg';
import ADA from './ada.svg';
import ADD from './add.svg';
import ADX from './adx.svg';
import AE from './ae.svg';
import AEON from './aeon.svg';
import AGI from './agi.svg';
import AGRS from './agrs.svg';
import AION from './aion.svg';
import AMB from './amb.svg';
import AMP from './amp.svg';
import ANT from './ant.svg';
import APEX from './apex.svg';
import APPC from './appc.svg';
import ARDR from './ardr.svg';
import ARG from './arg.svg';
import ARK from './ark.svg';
import ARN from './arn.svg';
import ARY from './ary.svg';
import AST from './ast.svg';
import ATM from './atm.svg';
import AUDR from './audr.svg';
import AUTO from './auto.svg';
import AYWA from './aywa.svg';
import BAB from './bab.svg';
import BAT from './bat.svg';
import BAY from './bay.svg';
import BCBC from './bcbc.svg';
import BCC from './bcc.svg';
import BCD from './bcd.svg';
import BCH from './bch.svg';
import BCN from './bcn.svg';
import BCO from './bco.svg';
import BCPT from './bcpt.svg';
import BDL from './bdl.svg';
import BEER from './beer.svg';
import BELA from './bela.svg';
import BIX from './bix.svg';
import BLCN from './blcn.svg';
import BLK from './blk.svg';
import BLOCK from './block.svg';
import BLZ from './blz.svg';
import BNB from './bnb.svg';
import BNT from './bnt.svg';
import BNTY from './bnty.svg';
import BOOTY from './booty.svg';
import BOS from './bos.svg';
import BPT from './bpt.svg';
import BQ from './bq.svg';
import BQX from './bqx.svg';
import BRD from './brd.svg';
import BSD from './bsd.svg';
import BSV from './bsv.svg';
import BTC from './btc.svg';
import BTCD from './btcd.svg';
import BTCH from './btch.svg';
import BTCP from './btcp.svg';
import BTCZ from './btcz.svg';
import BTDX from './btdx.svg';
import BTG from './btg.svg';
import BTM from './btm.svg';
import BTS from './bts.svg';
import BTX from './btx.svg';
import BURST from './burst.svg';
import CALL from './call.svg';
import CC from './cc.svg';
import CDN from './cdn.svg';
import CDT from './cdt.svg';
import CENZ from './cenz.svg';
import CHAIN from './chain.svg';
import CHAT from './chat.svg';
import CHIPS from './chips.svg';
import CIX from './cix.svg';
import CLAM from './clam.svg';
import CLOAK from './cloak.svg';
import CMM from './cmm.svg';
import CMT from './cmt.svg';
import CND from './cnd.svg';
import CNX from './cnx.svg';
import CNY from './cny.svg';
import COB from './cob.svg';
import COLX from './colx.svg';
import COQUI from './coqui.svg';
import CRED from './cred.svg';
import CRPT from './crpt.svg';
import CRW from './crw.svg';
import CS from './cs.svg';
import CTR from './ctr.svg';
import CTXC from './ctxc.svg';
import CVC from './cvc.svg';
import DASH from './dash.svg';
import DAT from './dat.svg';
import DATA from './data.svg';
import DBC from './dbc.svg';
import DCN from './dcn.svg';
import DCR from './dcr.svg';
import DEEZ from './deez.svg';
import DENT from './dent.svg';
import DEW from './dew.svg';
import DGB from './dgb.svg';
import DGD from './dgd.svg';
import DLT from './dlt.svg';
import DNR from './dnr.svg';
import DNT from './dnt.svg';
import DOCK from './dock.svg';
import DOGE from './doge.svg';
import DRGN from './drgn.svg';
import DROP from './drop.svg';
import DSEC from './dsec.svg';
import DTA from './dta.svg';
import DTH from './dth.svg';
import DTR from './dtr.svg';
import EBST from './ebst.svg';
import ECA from './eca.svg';
import EDG from './edg.svg';
import EDO from './edo.svg';
import EDOGE from './edoge.svg';
import ELA from './ela.svg';
import ELF from './elf.svg';
import ELIX from './elix.svg';
import ELLA from './ella.svg';
import EMC from './emc.svg';
import EMC2 from './emc2.svg';
import ENG from './eng.svg';
import ENJ from './enj.svg';
import ENTRP from './entrp.svg';
import EOS from './eos.svg';
import EQLI from './eqli.svg';
import EQUA from './equa.svg';
import ETC from './etc.svg';
import ETH from './eth.svg';
import ETHOS from './ethos.svg';
import ETN from './etn.svg';
import ETP from './etp.svg';
import EUR from './eur.svg';
import EVX from './evx.svg';
import EXMO from './exmo.svg';
import EXP from './exp.svg';
import FAIR from './fair.svg';
import FCT from './fct.svg';
import FIL from './fil.svg';
import FJC from './fjc.svg';
import FLDC from './fldc.svg';
import FLO from './flo.svg';
import FSN from './fsn.svg';
import FTC from './ftc.svg';
import FUEL from './fuel.svg';
import FUN from './fun.svg';
import GAME from './game.svg';
import GAS from './gas.svg';
import GBP from './gbp.svg';
import GBX from './gbx.svg';
import GBYTE from './gbyte.svg';
import GENERIC from './generic.svg';
import GLXT from './glxt.svg';
import GMR from './gmr.svg';
import GNO from './gno.svg';
import GNT from './gnt.svg';
import GOLD from './gold.svg';
import GRC from './grc.svg';
import GRS from './grs.svg';
import GSC from './gsc.svg';
import GTO from './gto.svg';
import GUP from './gup.svg';
import GUSD from './gusd.svg';
import GVT from './gvt.svg';
import GXLT from './gxlt.svg';
import GXS from './gxs.svg';
import GZR from './gzr.svg';
import HIGHT from './hight.svg';
import HODL from './hodl.svg';
import HPB from './hpb.svg';
import HSR from './hsr.svg';
import HT from './ht.svg';
import HTML from './html.svg';
import HUC from './huc.svg';
import HUSH from './hush.svg';
import ICN from './icn.svg';
import ICX from './icx.svg';
import IGNIS from './ignis.svg';
import INK from './ink.svg';
import INS from './ins.svg';
import ION from './ion.svg';
import IOP from './iop.svg';
import IOST from './iost.svg';
import IOT from './iot.svg';
import IOTX from './iotx.svg';
import IQ from './iq.svg';
import ITC from './itc.svg';
import JNT from './jnt.svg';
import JPY from './jpy.svg';
import KCS from './kcs.svg';
import KIN from './kin.svg';
import KMD from './kmd.svg';
import KNC from './knc.svg';
import KRB from './krb.svg';
import LBC from './lbc.svg';
import LEND from './lend.svg';
import LINK from './link.svg';
import LKK from './lkk.svg';
import LOOM from './loom.svg';
import LPT from './lpt.svg';
import LRC from './lrc.svg';
import LSK from './lsk.svg';
import LTC from './ltc.svg';
import LUN from './lun.svg';
import MAID from './maid.svg';
import MANA from './mana.svg';
import MCAP from './mcap.svg';
import MCO from './mco.svg';
import MDA from './mda.svg';
import MDS from './mds.svg';
import MED from './med.svg';
import MIOTA from './miota.svg';
import MITH from './mith.svg';
import MKR from './mkr.svg';
import MLN from './mln.svg';
import MNX from './mnx.svg';
import MNZ from './mnz.svg';
import MOAC from './moac.svg';
import MOD from './mod.svg';
import MONA from './mona.svg';
import MSR from './msr.svg';
import MTH from './mth.svg';
import MTL from './mtl.svg';
import MUSIC from './music.svg';
import MZC from './mzc.svg';
import NANO from './nano.svg';
import NAS from './nas.svg';
import NAV from './nav.svg';
import NCASH from './ncash.svg';
import NDZ from './ndz.svg';
import NEBL from './nebl.svg';
import NEO from './neo.svg';
import NEOS from './neos.svg';
import NEU from './neu.svg';
import NEXO from './nexo.svg';
import NGC from './ngc.svg';
import NIO from './nio.svg';
import NLC2 from './nlc2.svg';
import NLG from './nlg.svg';
import NMC from './nmc.svg';
import NPXS from './npxs.svg';
import NULS from './nuls.svg';
import NXS from './nxs.svg';
import NXT from './nxt.svg';
import OAX from './oax.svg';
import OK from './ok.svg';
import OMG from './omg.svg';
import OMNI from './omni.svg';
import ONG from './ong.svg';
import ONT from './ont.svg';
import OOT from './oot.svg';
import OST from './ost.svg';
import OX from './ox.svg';
import PAC from './pac.svg';
import PART from './part.svg';
import PASC from './pasc.svg';
import PASL from './pasl.svg';
import PAX from './pax.svg';
import PAY from './pay.svg';
import PAYX from './payx.svg';
import PINK from './pink.svg';
import PIRL from './pirl.svg';
import PIVX from './pivx.svg';
import PIZZA from './pizza.svg';
import PLR from './plr.svg';
import POA from './poa.svg';
import POE from './poe.svg';
import POLIS from './polis.svg';
import POLY from './poly.svg';
import POT from './pot.svg';
import POWR from './powr.svg';
import PPC from './ppc.svg';
import PPP from './ppp.svg';
import PPT from './ppt.svg';
import PRL from './prl.svg';
import PUNGO from './pungo.svg';
import PURA from './pura.svg';
import QASH from './qash.svg';
import QIWI from './qiwi.svg';
import QLC from './qlc.svg';
import QRL from './qrl.svg';
import QSP from './qsp.svg';
import QTUM from './qtum.svg';
import R from './r.svg';
import RADS from './rads.svg';
import RAP from './rap.svg';
import RCN from './rcn.svg';
import RDD from './rdd.svg';
import RDN from './rdn.svg';
import REP from './rep.svg';
import REQ from './req.svg';
import RHOC from './rhoc.svg';
import RIC from './ric.svg';
import RISE from './rise.svg';
import RLC from './rlc.svg';
import RPX from './rpx.svg';
import RUB from './rub.svg';
import RVN from './rvn.svg';
import RYO from './ryo.svg';
import SAFE from './safe.svg';
import SALT from './salt.svg';
import SAN from './san.svg';
import SBD from './sbd.svg';
import SBERBANK from './sberbank.svg';
import SC from './sc.svg';
import SHIFT from './shift.svg';
import SIB from './sib.svg';
import SKY from './sky.svg';
import SLR from './slr.svg';
import SLS from './sls.svg';
import SMART from './smart.svg';
import SNGLS from './sngls.svg';
import SNM from './snm.svg';
import SNT from './snt.svg';
import SOC from './soc.svg';
import SONM from './sonm.svg';
import SPANK from './spank.svg';
import SPHTX from './sphtx.svg';
import SRN from './srn.svg';
import STAK from './stak.svg';
import START from './start.svg';
import STEEM from './steem.svg';
import STORJ from './storj.svg';
import STORM from './storm.svg';
import STQ from './stq.svg';
import STRAT from './strat.svg';
import SUB from './sub.svg';
import SUMO from './sumo.svg';
import SYS from './sys.svg';
import TAAS from './taas.svg';
import TAU from './tau.svg';
import TBX from './tbx.svg';
import TEL from './tel.svg';
import TEN from './ten.svg';
import TERN from './tern.svg';
import TGHC from './tghc.svg';
import THETA from './theta.svg';
import TIX from './tix.svg';
import TKN from './tkn.svg';
import TKS from './tks.svg';
import TNB from './tnb.svg';
import TNC from './tnc.svg';
import TNT from './tnt.svg';
import TOMO from './tomo.svg';
import TPAY from './tpay.svg';
import TRIG from './trig.svg';
import TRTL from './trtl.svg';
import TRX from './trx.svg';
import TUSD from './tusd.svg';
import TZC from './tzc.svg';
import UBQ from './ubq.svg';
import UNITY from './unity.svg';
import UNKNOW from './unknow.svg';
import USD from './usd.svg';
import USDC from './usdc.svg';
import USDT from './usdt.svg';
import UTK from './utk.svg';
import VEN from './ven.svg';
import VERI from './veri.svg';
import VET from './vet.svg';
import VIA from './via.svg';
import VIB from './vib.svg';
import VIBE from './vibe.svg';
import VIVO from './vivo.svg';
import VRC from './vrc.svg';
import VRSC from './vrsc.svg';
import VTC from './vtc.svg';
import WABI from './wabi.svg';
import WAN from './wan.svg';
import WAVES from './waves.svg';
import WAX from './wax.svg';
import WGR from './wgr.svg';
import WICC from './wicc.svg';
import WINGS from './wings.svg';
import WPR from './wpr.svg';
import WTC from './wtc.svg';
import X from './x.svg';
import XAS from './xas.svg';
import XBC from './xbc.svg';
import XBY from './xby.svg';
import XCP from './xcp.svg';
import XDN from './xdn.svg';
import XEM from './xem.svg';
import XIN from './xin.svg';
import XLM from './xlm.svg';
import XMCC from './xmcc.svg';
import XMG from './xmg.svg';
import XMO from './xmo.svg';
import XMR from './xmr.svg';
import XMY from './xmy.svg';
import XP from './xp.svg';
import XPA from './xpa.svg';
import XPM from './xpm.svg';
import XRP from './xrp.svg';
import XSG from './xsg.svg';
import XTZ from './xtz.svg';
import XUC from './xuc.svg';
import XVC from './xvc.svg';
import XVG from './xvg.svg';
import XZC from './xzc.svg';
import YOYOW from './yoyow.svg';
import ZCL from './zcl.svg';
import ZEC from './zec.svg';
import ZEL from './zel.svg';
import ZEN from './zen.svg';
import ZEST from './zest.svg';
import ZIL from './zil.svg';
import ZILLA from './zilla.svg';
import ZRX from './zrx.svg';

const list = {
  $PAC,
  ABT,
  ACT,
  ACTN,
  ADA,
  ADD,
  ADX,
  AE,
  AEON,
  AGI,
  AGRS,
  AION,
  AMB,
  AMP,
  ANT,
  APEX,
  APPC,
  ARDR,
  ARG,
  ARK,
  ARN,
  ARY,
  AST,
  ATM,
  AUDR,
  AUTO,
  AYWA,
  BAB,
  BAT,
  BAY,
  BCBC,
  BCC,
  BCD,
  BCH,
  BCN,
  BCO,
  BCPT,
  BDL,
  BEER,
  BELA,
  BIX,
  BLCN,
  BLK,
  BLOCK,
  BLZ,
  BNB,
  BNT,
  BNTY,
  BOOTY,
  BOS,
  BPT,
  BQ,
  BQX,
  BRD,
  BSD,
  BSV,
  BTC,
  BTCD,
  BTCH,
  BTCP,
  BTCZ,
  BTDX,
  BTG,
  BTM,
  BTS,
  BTX,
  BURST,
  CALL,
  CC,
  CDN,
  CDT,
  CENZ,
  CHAIN,
  CHAT,
  CHIPS,
  CIX,
  CLAM,
  CLOAK,
  CMM,
  CMT,
  CND,
  CNX,
  CNY,
  COB,
  COLX,
  COQUI,
  CRED,
  CRPT,
  CRW,
  CS,
  CTR,
  CTXC,
  CVC,
  DASH,
  DAT,
  DATA,
  DBC,
  DCN,
  DCR,
  DEEZ,
  DENT,
  DEW,
  DGB,
  DGD,
  DLT,
  DNR,
  DNT,
  DOCK,
  DOGE,
  DRGN,
  DROP,
  DSEC,
  DTA,
  DTH,
  DTR,
  EBST,
  ECA,
  EDG,
  EDO,
  EDOGE,
  ELA,
  ELF,
  ELIX,
  ELLA,
  EMC,
  EMC2,
  ENG,
  ENJ,
  ENTRP,
  EOS,
  EQLI,
  EQUA,
  ETC,
  ETH,
  ETHOS,
  ETN,
  ETP,
  EUR,
  EVX,
  EXMO,
  EXP,
  FAIR,
  FCT,
  FIL,
  FJC,
  FLDC,
  FLO,
  FSN,
  FTC,
  FUEL,
  FUN,
  GAME,
  GAS,
  GBP,
  GBX,
  GBYTE,
  GENERIC,
  GLXT,
  GMR,
  GNO,
  GNT,
  GOLD,
  GRC,
  GRS,
  GSC,
  GTO,
  GUP,
  GUSD,
  GVT,
  GXLT,
  GXS,
  GZR,
  HIGHT,
  HODL,
  HPB,
  HSR,
  HT,
  HTML,
  HUC,
  HUSH,
  ICN,
  ICX,
  IGNIS,
  INK,
  INS,
  ION,
  IOP,
  IOST,
  IOT,
  IOTX,
  IQ,
  ITC,
  JNT,
  JPY,
  KCS,
  KIN,
  KMD,
  KNC,
  KRB,
  LBC,
  LEND,
  LINK,
  LKK,
  LOOM,
  LPT,
  LRC,
  LSK,
  LTC,
  LUN,
  MAID,
  MANA,
  MCAP,
  MCO,
  MDA,
  MDS,
  MED,
  MIOTA,
  MITH,
  MKR,
  MLN,
  MNX,
  MNZ,
  MOAC,
  MOD,
  MONA,
  MSR,
  MTH,
  MTL,
  MUSIC,
  MZC,
  NANO,
  NAS,
  NAV,
  NCASH,
  NDZ,
  NEBL,
  NEO,
  NEOS,
  NEU,
  NEXO,
  NGC,
  NIO,
  NLC2,
  NLG,
  NMC,
  NPXS,
  NULS,
  NXS,
  NXT,
  OAX,
  OK,
  OMG,
  OMNI,
  ONG,
  ONT,
  OOT,
  OST,
  OX,
  PAC,
  PART,
  PASC,
  PASL,
  PAX,
  PAY,
  PAYX,
  PINK,
  PIRL,
  PIVX,
  PIZZA,
  PLR,
  POA,
  POE,
  POLIS,
  POLY,
  POT,
  POWR,
  PPC,
  PPP,
  PPT,
  PRL,
  PUNGO,
  PURA,
  QASH,
  QIWI,
  QLC,
  QRL,
  QSP,
  QTUM,
  R,
  RADS,
  RAP,
  RCN,
  RDD,
  RDN,
  REP,
  REQ,
  RHOC,
  RIC,
  RISE,
  RLC,
  RPX,
  RUB,
  RVN,
  RYO,
  SAFE,
  SALT,
  SAN,
  SBD,
  SBERBANK,
  SC,
  SHIFT,
  SIB,
  SKY,
  SLR,
  SLS,
  SMART,
  SNGLS,
  SNM,
  SNT,
  SOC,
  SONM,
  SPANK,
  SPHTX,
  SRN,
  STAK,
  START,
  STEEM,
  STORJ,
  STORM,
  STQ,
  STRAT,
  SUB,
  SUMO,
  SYS,
  TAAS,
  TAU,
  TBX,
  TEL,
  TEN,
  TERN,
  TGHC,
  THETA,
  TIX,
  TKN,
  TKS,
  TNB,
  TNC,
  TNT,
  TOMO,
  TPAY,
  TRIG,
  TRTL,
  TRX,
  TUSD,
  TZC,
  UBQ,
  UNITY,
  UNKNOW,
  USD,
  USDC,
  USDT,
  UTK,
  VEN,
  VERI,
  VET,
  VIA,
  VIB,
  VIBE,
  VIVO,
  VRC,
  VRSC,
  VTC,
  WABI,
  WAN,
  WAVES,
  WAX,
  WGR,
  WICC,
  WINGS,
  WPR,
  WTC,
  X,
  XAS,
  XBC,
  XBY,
  XCP,
  XDN,
  XEM,
  XIN,
  XLM,
  XMCC,
  XMG,
  XMO,
  XMR,
  XMY,
  XP,
  XPA,
  XPM,
  XRP,
  XSG,
  XTZ,
  XUC,
  XVC,
  XVG,
  XZC,
  YOYOW,
  ZCL,
  ZEC,
  ZEL,
  ZEN,
  ZEST,
  ZIL,
  ZILLA,
  ZRX
};

const getCoinMemoize = function(
  icon: string,
  width: number = 32,
  height: number = 32
) {
  const I = list[icon.toUpperCase()];
  if (I) {
    return <I width={width} height={height} viewBox="0 0 32 32" />;
  }
  return <UNKNOW width={width} height={height} viewBox="0 0 32 32" />;
};

export default memoize(getCoinMemoize, {
  strategy: memoize.strategies.variadic
});
