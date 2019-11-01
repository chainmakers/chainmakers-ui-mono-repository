// @flow
// eslint-disable-next-line no-unused-vars
/**
 * Update file scripts
 *
 * var fs = require('fs');
 * fs.readdir('crypto-icons/svgs/app/components/CryptoIcons', function(err, files) {
 *  const imports = files.map(e => `import ${e.split('.').slice(0, -1).join('.').toUpperCase()} from 'crypto-icons/svgs/${e};`);
 *  for(let i = 0; i < imports.length; i+=1) {
 *    console.log(imports[i]);
 *  }
 * });
 *
 */

import React from 'react';
import { memoize } from 'barterdex-utilities';

import $PAC from 'crypto-icons/svgs/$pac.svg';
import ABT from 'crypto-icons/svgs/abt.svg';
import ACT from 'crypto-icons/svgs/act.svg';
import ACTN from 'crypto-icons/svgs/actn.svg';
import ADA from 'crypto-icons/svgs/ada.svg';
import ADD from 'crypto-icons/svgs/add.svg';
import ADX from 'crypto-icons/svgs/adx.svg';
import AE from 'crypto-icons/svgs/ae.svg';
import AEON from 'crypto-icons/svgs/aeon.svg';
import AGI from 'crypto-icons/svgs/agi.svg';
import AGRS from 'crypto-icons/svgs/agrs.svg';
import AION from 'crypto-icons/svgs/aion.svg';
import AMB from 'crypto-icons/svgs/amb.svg';
import AMP from 'crypto-icons/svgs/amp.svg';
import ANT from 'crypto-icons/svgs/ant.svg';
import APEX from 'crypto-icons/svgs/apex.svg';
import APPC from 'crypto-icons/svgs/appc.svg';
import ARDR from 'crypto-icons/svgs/ardr.svg';
import ARG from 'crypto-icons/svgs/arg.svg';
import ARK from 'crypto-icons/svgs/ark.svg';
import ARN from 'crypto-icons/svgs/arn.svg';
import ARY from 'crypto-icons/svgs/ary.svg';
import AST from 'crypto-icons/svgs/ast.svg';
import ATM from 'crypto-icons/svgs/atm.svg';
import AUDR from 'crypto-icons/svgs/audr.svg';
import AUTO from 'crypto-icons/svgs/auto.svg';
import AYWA from 'crypto-icons/svgs/aywa.svg';
import BAB from 'crypto-icons/svgs/bab.svg';
import BAT from 'crypto-icons/svgs/bat.svg';
import BAY from 'crypto-icons/svgs/bay.svg';
import BCBC from 'crypto-icons/svgs/bcbc.svg';
import BCC from 'crypto-icons/svgs/bcc.svg';
import BCD from 'crypto-icons/svgs/bcd.svg';
import BCH from 'crypto-icons/svgs/bch.svg';
import BCN from 'crypto-icons/svgs/bcn.svg';
import BCO from 'crypto-icons/svgs/bco.svg';
import BCPT from 'crypto-icons/svgs/bcpt.svg';
import BDL from 'crypto-icons/svgs/bdl.svg';
import BEER from 'crypto-icons/svgs/beer.svg';
import BELA from 'crypto-icons/svgs/bela.svg';
import BIX from 'crypto-icons/svgs/bix.svg';
import BLCN from 'crypto-icons/svgs/blcn.svg';
import BLK from 'crypto-icons/svgs/blk.svg';
import BLOCK from 'crypto-icons/svgs/block.svg';
import BLZ from 'crypto-icons/svgs/blz.svg';
import BNB from 'crypto-icons/svgs/bnb.svg';
import BNT from 'crypto-icons/svgs/bnt.svg';
import BNTY from 'crypto-icons/svgs/bnty.svg';
import BOOTY from 'crypto-icons/svgs/booty.svg';
import BOS from 'crypto-icons/svgs/bos.svg';
import BPT from 'crypto-icons/svgs/bpt.svg';
import BQ from 'crypto-icons/svgs/bq.svg';
import BQX from 'crypto-icons/svgs/bqx.svg';
import BRD from 'crypto-icons/svgs/brd.svg';
import BSD from 'crypto-icons/svgs/bsd.svg';
import BSV from 'crypto-icons/svgs/bsv.svg';
import BTC from 'crypto-icons/svgs/btc.svg';
import BTCD from 'crypto-icons/svgs/btcd.svg';
import BTCH from 'crypto-icons/svgs/btch.svg';
import BTCP from 'crypto-icons/svgs/btcp.svg';
import BTCZ from 'crypto-icons/svgs/btcz.svg';
import BTDX from 'crypto-icons/svgs/btdx.svg';
import BTG from 'crypto-icons/svgs/btg.svg';
import BTM from 'crypto-icons/svgs/btm.svg';
import BTS from 'crypto-icons/svgs/bts.svg';
import BTX from 'crypto-icons/svgs/btx.svg';
import BURST from 'crypto-icons/svgs/burst.svg';
import CALL from 'crypto-icons/svgs/call.svg';
import CC from 'crypto-icons/svgs/cc.svg';
import CDN from 'crypto-icons/svgs/cdn.svg';
import CDT from 'crypto-icons/svgs/cdt.svg';
import CENZ from 'crypto-icons/svgs/cenz.svg';
import CHAIN from 'crypto-icons/svgs/chain.svg';
import CHAT from 'crypto-icons/svgs/chat.svg';
import CHIPS from 'crypto-icons/svgs/chips.svg';
import CIX from 'crypto-icons/svgs/cix.svg';
import CLAM from 'crypto-icons/svgs/clam.svg';
import CLOAK from 'crypto-icons/svgs/cloak.svg';
import CMM from 'crypto-icons/svgs/cmm.svg';
import CMT from 'crypto-icons/svgs/cmt.svg';
import CND from 'crypto-icons/svgs/cnd.svg';
import CNX from 'crypto-icons/svgs/cnx.svg';
import CNY from 'crypto-icons/svgs/cny.svg';
import COB from 'crypto-icons/svgs/cob.svg';
import COLX from 'crypto-icons/svgs/colx.svg';
import COQUI from 'crypto-icons/svgs/coqui.svg';
import CRED from 'crypto-icons/svgs/cred.svg';
import CRPT from 'crypto-icons/svgs/crpt.svg';
import CRW from 'crypto-icons/svgs/crw.svg';
import CS from 'crypto-icons/svgs/cs.svg';
import CTR from 'crypto-icons/svgs/ctr.svg';
import CTXC from 'crypto-icons/svgs/ctxc.svg';
import CVC from 'crypto-icons/svgs/cvc.svg';
import DASH from 'crypto-icons/svgs/dash.svg';
import DAT from 'crypto-icons/svgs/dat.svg';
import DATA from 'crypto-icons/svgs/data.svg';
import DBC from 'crypto-icons/svgs/dbc.svg';
import DCN from 'crypto-icons/svgs/dcn.svg';
import DCR from 'crypto-icons/svgs/dcr.svg';
import DEEZ from 'crypto-icons/svgs/deez.svg';
import DENT from 'crypto-icons/svgs/dent.svg';
import DEW from 'crypto-icons/svgs/dew.svg';
import DEX from 'crypto-icons/svgs/dex.svg';
import DGB from 'crypto-icons/svgs/dgb.svg';
import DGD from 'crypto-icons/svgs/dgd.svg';
import DLT from 'crypto-icons/svgs/dlt.svg';
import DNR from 'crypto-icons/svgs/dnr.svg';
import DNT from 'crypto-icons/svgs/dnt.svg';
import DOCK from 'crypto-icons/svgs/dock.svg';
import DOGE from 'crypto-icons/svgs/doge.svg';
import DRGN from 'crypto-icons/svgs/drgn.svg';
import DROP from 'crypto-icons/svgs/drop.svg';
import DSEC from 'crypto-icons/svgs/dsec.svg';
import DTA from 'crypto-icons/svgs/dta.svg';
import DTH from 'crypto-icons/svgs/dth.svg';
import DTR from 'crypto-icons/svgs/dtr.svg';
import EBST from 'crypto-icons/svgs/ebst.svg';
import ECA from 'crypto-icons/svgs/eca.svg';
import EDG from 'crypto-icons/svgs/edg.svg';
import EDO from 'crypto-icons/svgs/edo.svg';
import EDOGE from 'crypto-icons/svgs/edoge.svg';
import ELA from 'crypto-icons/svgs/ela.svg';
import ELF from 'crypto-icons/svgs/elf.svg';
import ELIX from 'crypto-icons/svgs/elix.svg';
import ELLA from 'crypto-icons/svgs/ella.svg';
import EMC from 'crypto-icons/svgs/emc.svg';
import EMC2 from 'crypto-icons/svgs/emc2.svg';
import ENG from 'crypto-icons/svgs/eng.svg';
import ENJ from 'crypto-icons/svgs/enj.svg';
import ENTRP from 'crypto-icons/svgs/entrp.svg';
import EOS from 'crypto-icons/svgs/eos.svg';
import EQLI from 'crypto-icons/svgs/eqli.svg';
import EQUA from 'crypto-icons/svgs/equa.svg';
import ETC from 'crypto-icons/svgs/etc.svg';
import ETH from 'crypto-icons/svgs/eth.svg';
import ETHOS from 'crypto-icons/svgs/ethos.svg';
import ETN from 'crypto-icons/svgs/etn.svg';
import ETP from 'crypto-icons/svgs/etp.svg';
import EUR from 'crypto-icons/svgs/eur.svg';
import EVX from 'crypto-icons/svgs/evx.svg';
import EXMO from 'crypto-icons/svgs/exmo.svg';
import EXP from 'crypto-icons/svgs/exp.svg';
import FAIR from 'crypto-icons/svgs/fair.svg';
import FCT from 'crypto-icons/svgs/fct.svg';
import FIL from 'crypto-icons/svgs/fil.svg';
import FJC from 'crypto-icons/svgs/fjc.svg';
import FLDC from 'crypto-icons/svgs/fldc.svg';
import FLO from 'crypto-icons/svgs/flo.svg';
import FSN from 'crypto-icons/svgs/fsn.svg';
import FTC from 'crypto-icons/svgs/ftc.svg';
import FUEL from 'crypto-icons/svgs/fuel.svg';
import FUN from 'crypto-icons/svgs/fun.svg';
import GAME from 'crypto-icons/svgs/game.svg';
import GAS from 'crypto-icons/svgs/gas.svg';
import GBP from 'crypto-icons/svgs/gbp.svg';
import GBX from 'crypto-icons/svgs/gbx.svg';
import GBYTE from 'crypto-icons/svgs/gbyte.svg';
import GENERIC from 'crypto-icons/svgs/generic.svg';
import GLXT from 'crypto-icons/svgs/glxt.svg';
import GMR from 'crypto-icons/svgs/gmr.svg';
import GNO from 'crypto-icons/svgs/gno.svg';
import GNT from 'crypto-icons/svgs/gnt.svg';
import GOLD from 'crypto-icons/svgs/gold.svg';
import GRC from 'crypto-icons/svgs/grc.svg';
import GRS from 'crypto-icons/svgs/grs.svg';
import GSC from 'crypto-icons/svgs/gsc.svg';
import GTO from 'crypto-icons/svgs/gto.svg';
import GUP from 'crypto-icons/svgs/gup.svg';
import GUSD from 'crypto-icons/svgs/gusd.svg';
import GVT from 'crypto-icons/svgs/gvt.svg';
import GXLT from 'crypto-icons/svgs/gxlt.svg';
import GXS from 'crypto-icons/svgs/gxs.svg';
import GZR from 'crypto-icons/svgs/gzr.svg';
import HIGHT from 'crypto-icons/svgs/hight.svg';
import HODL from 'crypto-icons/svgs/hodl.svg';
import HPB from 'crypto-icons/svgs/hpb.svg';
import HSR from 'crypto-icons/svgs/hsr.svg';
import HT from 'crypto-icons/svgs/ht.svg';
import HTML from 'crypto-icons/svgs/html.svg';
import HUC from 'crypto-icons/svgs/huc.svg';
import HUSH from 'crypto-icons/svgs/hush.svg';
import ICN from 'crypto-icons/svgs/icn.svg';
import ICX from 'crypto-icons/svgs/icx.svg';
import IGNIS from 'crypto-icons/svgs/ignis.svg';
import INK from 'crypto-icons/svgs/ink.svg';
import INS from 'crypto-icons/svgs/ins.svg';
import ION from 'crypto-icons/svgs/ion.svg';
import IOP from 'crypto-icons/svgs/iop.svg';
import IOST from 'crypto-icons/svgs/iost.svg';
import IOT from 'crypto-icons/svgs/iot.svg';
import IOTX from 'crypto-icons/svgs/iotx.svg';
import IQ from 'crypto-icons/svgs/iq.svg';
import ITC from 'crypto-icons/svgs/itc.svg';
import JNT from 'crypto-icons/svgs/jnt.svg';
import JPY from 'crypto-icons/svgs/jpy.svg';
import K64 from 'crypto-icons/svgs/k64.svg';
import KCS from 'crypto-icons/svgs/kcs.svg';
import KIN from 'crypto-icons/svgs/kin.svg';
import KMD from 'crypto-icons/svgs/kmd.svg';
import KMDICE from 'crypto-icons/svgs/kmdice.svg';
import KNC from 'crypto-icons/svgs/knc.svg';
import KRB from 'crypto-icons/svgs/krb.svg';
import LBC from 'crypto-icons/svgs/lbc.svg';
import LEND from 'crypto-icons/svgs/lend.svg';
import LINK from 'crypto-icons/svgs/link.svg';
import LKK from 'crypto-icons/svgs/lkk.svg';
import LOOM from 'crypto-icons/svgs/loom.svg';
import LPT from 'crypto-icons/svgs/lpt.svg';
import LRC from 'crypto-icons/svgs/lrc.svg';
import LSK from 'crypto-icons/svgs/lsk.svg';
import LTC from 'crypto-icons/svgs/ltc.svg';
import LUN from 'crypto-icons/svgs/lun.svg';
import MAID from 'crypto-icons/svgs/maid.svg';
import MANA from 'crypto-icons/svgs/mana.svg';
import MCAP from 'crypto-icons/svgs/mcap.svg';
import MCO from 'crypto-icons/svgs/mco.svg';
import MDA from 'crypto-icons/svgs/mda.svg';
import MDS from 'crypto-icons/svgs/mds.svg';
import MED from 'crypto-icons/svgs/med.svg';
import MIOTA from 'crypto-icons/svgs/miota.svg';
import MITH from 'crypto-icons/svgs/mith.svg';
import MKR from 'crypto-icons/svgs/mkr.svg';
import MLN from 'crypto-icons/svgs/mln.svg';
import MNX from 'crypto-icons/svgs/mnx.svg';
import MNZ from 'crypto-icons/svgs/mnz.svg';
import MOAC from 'crypto-icons/svgs/moac.svg';
import MOD from 'crypto-icons/svgs/mod.svg';
import MONA from 'crypto-icons/svgs/mona.svg';
import MSR from 'crypto-icons/svgs/msr.svg';
import MTH from 'crypto-icons/svgs/mth.svg';
import MTL from 'crypto-icons/svgs/mtl.svg';
import MUSIC from 'crypto-icons/svgs/music.svg';
import MZC from 'crypto-icons/svgs/mzc.svg';
import NANO from 'crypto-icons/svgs/nano.svg';
import NAS from 'crypto-icons/svgs/nas.svg';
import NAV from 'crypto-icons/svgs/nav.svg';
import NCASH from 'crypto-icons/svgs/ncash.svg';
import NDZ from 'crypto-icons/svgs/ndz.svg';
import NEBL from 'crypto-icons/svgs/nebl.svg';
import NEO from 'crypto-icons/svgs/neo.svg';
import NEOS from 'crypto-icons/svgs/neos.svg';
import NEU from 'crypto-icons/svgs/neu.svg';
import NEXO from 'crypto-icons/svgs/nexo.svg';
import NGC from 'crypto-icons/svgs/ngc.svg';
import NIO from 'crypto-icons/svgs/nio.svg';
import NLC2 from 'crypto-icons/svgs/nlc2.svg';
import NLG from 'crypto-icons/svgs/nlg.svg';
import NMC from 'crypto-icons/svgs/nmc.svg';
import NPXS from 'crypto-icons/svgs/npxs.svg';
import NULS from 'crypto-icons/svgs/nuls.svg';
import NXS from 'crypto-icons/svgs/nxs.svg';
import NXT from 'crypto-icons/svgs/nxt.svg';
import OAX from 'crypto-icons/svgs/oax.svg';
import OK from 'crypto-icons/svgs/ok.svg';
import OMG from 'crypto-icons/svgs/omg.svg';
import OMNI from 'crypto-icons/svgs/omni.svg';
import ONG from 'crypto-icons/svgs/ong.svg';
import ONT from 'crypto-icons/svgs/ont.svg';
import OOT from 'crypto-icons/svgs/oot.svg';
import OST from 'crypto-icons/svgs/ost.svg';
import OX from 'crypto-icons/svgs/ox.svg';
import PAC from 'crypto-icons/svgs/pac.svg';
import PART from 'crypto-icons/svgs/part.svg';
import PASC from 'crypto-icons/svgs/pasc.svg';
import PASL from 'crypto-icons/svgs/pasl.svg';
import PAX from 'crypto-icons/svgs/pax.svg';
import PAY from 'crypto-icons/svgs/pay.svg';
import PAYX from 'crypto-icons/svgs/payx.svg';
import PINK from 'crypto-icons/svgs/pink.svg';
import PIRL from 'crypto-icons/svgs/pirl.svg';
import PIVX from 'crypto-icons/svgs/pivx.svg';
import PIZZA from 'crypto-icons/svgs/pizza.svg';
import PLR from 'crypto-icons/svgs/plr.svg';
import POA from 'crypto-icons/svgs/poa.svg';
import POE from 'crypto-icons/svgs/poe.svg';
import POLIS from 'crypto-icons/svgs/polis.svg';
import POLY from 'crypto-icons/svgs/poly.svg';
import POT from 'crypto-icons/svgs/pot.svg';
import POWR from 'crypto-icons/svgs/powr.svg';
import PPC from 'crypto-icons/svgs/ppc.svg';
import PPP from 'crypto-icons/svgs/ppp.svg';
import PPT from 'crypto-icons/svgs/ppt.svg';
import PRL from 'crypto-icons/svgs/prl.svg';
import PUNGO from 'crypto-icons/svgs/pungo.svg';
import PURA from 'crypto-icons/svgs/pura.svg';
import QASH from 'crypto-icons/svgs/qash.svg';
import QIWI from 'crypto-icons/svgs/qiwi.svg';
import QLC from 'crypto-icons/svgs/qlc.svg';
import QRL from 'crypto-icons/svgs/qrl.svg';
import QSP from 'crypto-icons/svgs/qsp.svg';
import QTUM from 'crypto-icons/svgs/qtum.svg';
import R from 'crypto-icons/svgs/r.svg';
import RADS from 'crypto-icons/svgs/rads.svg';
import RAP from 'crypto-icons/svgs/rap.svg';
import RCN from 'crypto-icons/svgs/rcn.svg';
import RDD from 'crypto-icons/svgs/rdd.svg';
import RDN from 'crypto-icons/svgs/rdn.svg';
import REP from 'crypto-icons/svgs/rep.svg';
import REQ from 'crypto-icons/svgs/req.svg';
import RHOC from 'crypto-icons/svgs/rhoc.svg';
import RIC from 'crypto-icons/svgs/ric.svg';
import RISE from 'crypto-icons/svgs/rise.svg';
import RLC from 'crypto-icons/svgs/rlc.svg';
import RPX from 'crypto-icons/svgs/rpx.svg';
import RUB from 'crypto-icons/svgs/rub.svg';
import RVN from 'crypto-icons/svgs/rvn.svg';
import RYO from 'crypto-icons/svgs/ryo.svg';
import SAFE from 'crypto-icons/svgs/safe.svg';
import SALT from 'crypto-icons/svgs/salt.svg';
import SAN from 'crypto-icons/svgs/san.svg';
import SBD from 'crypto-icons/svgs/sbd.svg';
import SBERBANK from 'crypto-icons/svgs/sberbank.svg';
import SC from 'crypto-icons/svgs/sc.svg';
import SHIFT from 'crypto-icons/svgs/shift.svg';
import SIB from 'crypto-icons/svgs/sib.svg';
import SKY from 'crypto-icons/svgs/sky.svg';
import SLR from 'crypto-icons/svgs/slr.svg';
import SLS from 'crypto-icons/svgs/sls.svg';
import SMART from 'crypto-icons/svgs/smart.svg';
import SNGLS from 'crypto-icons/svgs/sngls.svg';
import SNM from 'crypto-icons/svgs/snm.svg';
import SNT from 'crypto-icons/svgs/snt.svg';
import SOC from 'crypto-icons/svgs/soc.svg';
import SONM from 'crypto-icons/svgs/sonm.svg';
import SPANK from 'crypto-icons/svgs/spank.svg';
import SPHTX from 'crypto-icons/svgs/sphtx.svg';
import SRN from 'crypto-icons/svgs/srn.svg';
import STAK from 'crypto-icons/svgs/stak.svg';
import START from 'crypto-icons/svgs/start.svg';
import STEEM from 'crypto-icons/svgs/steem.svg';
import STORJ from 'crypto-icons/svgs/storj.svg';
import STORM from 'crypto-icons/svgs/storm.svg';
import STQ from 'crypto-icons/svgs/stq.svg';
import STRAT from 'crypto-icons/svgs/strat.svg';
import SUB from 'crypto-icons/svgs/sub.svg';
import SUMO from 'crypto-icons/svgs/sumo.svg';
import SYS from 'crypto-icons/svgs/sys.svg';
import TAAS from 'crypto-icons/svgs/taas.svg';
import TAU from 'crypto-icons/svgs/tau.svg';
import TBX from 'crypto-icons/svgs/tbx.svg';
import TEL from 'crypto-icons/svgs/tel.svg';
import TEN from 'crypto-icons/svgs/ten.svg';
import TERN from 'crypto-icons/svgs/tern.svg';
import TGHC from 'crypto-icons/svgs/tghc.svg';
import THETA from 'crypto-icons/svgs/theta.svg';
import TIX from 'crypto-icons/svgs/tix.svg';
import TKN from 'crypto-icons/svgs/tkn.svg';
import TKS from 'crypto-icons/svgs/tks.svg';
import TNB from 'crypto-icons/svgs/tnb.svg';
import TNC from 'crypto-icons/svgs/tnc.svg';
import TNT from 'crypto-icons/svgs/tnt.svg';
import TOMO from 'crypto-icons/svgs/tomo.svg';
import TPAY from 'crypto-icons/svgs/tpay.svg';
import TRIG from 'crypto-icons/svgs/trig.svg';
import TRTL from 'crypto-icons/svgs/trtl.svg';
import TRX from 'crypto-icons/svgs/trx.svg';
import TUSD from 'crypto-icons/svgs/tusd.svg';
import TZC from 'crypto-icons/svgs/tzc.svg';
import UBQ from 'crypto-icons/svgs/ubq.svg';
import UNITY from 'crypto-icons/svgs/unity.svg';
import UNKNOW from 'crypto-icons/svgs/unknow.svg';
import USD from 'crypto-icons/svgs/usd.svg';
import USDC from 'crypto-icons/svgs/usdc.svg';
import USDT from 'crypto-icons/svgs/usdt.svg';
import UTK from 'crypto-icons/svgs/utk.svg';
import VEN from 'crypto-icons/svgs/ven.svg';
import VERI from 'crypto-icons/svgs/veri.svg';
import VET from 'crypto-icons/svgs/vet.svg';
import VIA from 'crypto-icons/svgs/via.svg';
import VIB from 'crypto-icons/svgs/vib.svg';
import VIBE from 'crypto-icons/svgs/vibe.svg';
import VIVO from 'crypto-icons/svgs/vivo.svg';
import VRC from 'crypto-icons/svgs/vrc.svg';
import VRSC from 'crypto-icons/svgs/vrsc.svg';
import VTC from 'crypto-icons/svgs/vtc.svg';
import WABI from 'crypto-icons/svgs/wabi.svg';
import WAN from 'crypto-icons/svgs/wan.svg';
import WAVES from 'crypto-icons/svgs/waves.svg';
import WAX from 'crypto-icons/svgs/wax.svg';
import WGR from 'crypto-icons/svgs/wgr.svg';
import WICC from 'crypto-icons/svgs/wicc.svg';
import WINGS from 'crypto-icons/svgs/wings.svg';
import WPR from 'crypto-icons/svgs/wpr.svg';
import WTC from 'crypto-icons/svgs/wtc.svg';
import X from 'crypto-icons/svgs/x.svg';
import XAS from 'crypto-icons/svgs/xas.svg';
import XBC from 'crypto-icons/svgs/xbc.svg';
import XBY from 'crypto-icons/svgs/xby.svg';
import XCP from 'crypto-icons/svgs/xcp.svg';
import XDN from 'crypto-icons/svgs/xdn.svg';
import XEM from 'crypto-icons/svgs/xem.svg';
import XIN from 'crypto-icons/svgs/xin.svg';
import XLM from 'crypto-icons/svgs/xlm.svg';
import XMCC from 'crypto-icons/svgs/xmcc.svg';
import XMG from 'crypto-icons/svgs/xmg.svg';
import XMO from 'crypto-icons/svgs/xmo.svg';
import XMR from 'crypto-icons/svgs/xmr.svg';
import XMY from 'crypto-icons/svgs/xmy.svg';
import XP from 'crypto-icons/svgs/xp.svg';
import XPA from 'crypto-icons/svgs/xpa.svg';
import XPM from 'crypto-icons/svgs/xpm.svg';
import XRP from 'crypto-icons/svgs/xrp.svg';
import XSG from 'crypto-icons/svgs/xsg.svg';
import XTZ from 'crypto-icons/svgs/xtz.svg';
import XUC from 'crypto-icons/svgs/xuc.svg';
import XVC from 'crypto-icons/svgs/xvc.svg';
import XVG from 'crypto-icons/svgs/xvg.svg';
import XZC from 'crypto-icons/svgs/xzc.svg';
import YOYOW from 'crypto-icons/svgs/yoyow.svg';
import ZCL from 'crypto-icons/svgs/zcl.svg';
import ZEC from 'crypto-icons/svgs/zec.svg';
import ZEL from 'crypto-icons/svgs/zel.svg';
import ZEN from 'crypto-icons/svgs/zen.svg';
import ZEST from 'crypto-icons/svgs/zest.svg';
import ZIL from 'crypto-icons/svgs/zil.svg';
import ZILLA from 'crypto-icons/svgs/zilla.svg';
import ZRX from 'crypto-icons/svgs/zrx.svg';
import LABS from 'crypto-icons/svgs/labs.svg';
import DAI from 'crypto-icons/svgs/dai.svg';

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
  DEX,
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
  K64,
  KCS,
  KIN,
  KMD,
  KMDICE,
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
  ZRX,
  LABS,
  DAI
};

function getCoinMemoize(icon: string, width: number = 32, height: number = 32) {
  const I = list[icon.toUpperCase()];
  if (I) {
    return <I width={width} height={height} viewBox="0 0 32 32" />;
  }
  return <UNKNOW width={width} height={height} viewBox="0 0 32 32" />;
}

export default memoize(getCoinMemoize, {
  strategy: memoize.strategies.variadic
});
