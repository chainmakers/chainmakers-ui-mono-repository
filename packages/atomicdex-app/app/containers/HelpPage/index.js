// @flow
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import { NavigationLayout } from '../Layout';

const styles = {
  container: {
    marginTop: 65,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    paddingBottom: 30
  }
};

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class HelpPage extends Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <Typography variant="h6" gutterBottom>
            Introducing, Alice and Bob
          </Typography>
          <Typography variant="body1" gutterBottom>
            To understand why the atomic-swap protocol is necessary, it is first
            important to recall that computer code is executed in linear
            fashion. Even if we were to assume that both parties in a trade may
            be honest, on a computer the process of taking money from each
            digital wallet and pulling the money into the open must happen one
            wallet at a time. Therefore, one person must send out their money
            first. The atomicswap protocol protects that person from
            vulnerability. Without the atomic swap, any malicious party involved
            (whether it be a full-relay node, trading partner, or other external
            agent) would be able to destroy the fairness of the trade.
          </Typography>
          <Typography variant="body1" gutterBottom>
            There are two parties in an atomic swap: the liquidity provider and
            the liquidity receiver. Once the process of an atomic swap begins,
            the behavior of each party’s public trading profile is recorded and
            added to their reputation on the BarterDEX network.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The process of an atomic swap begins with the person who makes the
            initial request—this is the liquidity receiver. By convention, we
            call this person, “Alice.” Alice will need two UTXOs to perform her
            swap. One UTXO will cover the protocol fee, which is roughly 1/777th
            the size of her desired order. We call this fee the &lt;dexfee&gt;,
            and its primary purpose is to serve as a disincentive to Alice from
            spamming the network with rapid requests.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The second UTXO required of Alice is the actual amount she intends
            to swap. BarterDEX first verifies that she has these funds, but for
            the moment she retains these funds in the safety of her own digital
            wallet.
          </Typography>
          <Typography variant="body1" gutterBottom>
            On the other side of the atomic swap, we have the liquidity
            provider—we call this person, “Bob.” Bob sees the request on the
            network for Alice’s atomic swap and decides to accept the trade. Now
            his part of the process begins.
          </Typography>
          <Typography variant="body1" gutterBottom>
            To complete the trade, he must also have two UTXOs, but with one
            important difference: the first UTXO is equal to 112.5% of the
            amount that Alice requested; the second UTXO is exactly equal to the
            amount that Alice intends to swap. In other words, Bob must provide
            liquidity of 212.5% of the total amount of the currency that Alice
            requests.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The first UTXO (112.5%) Bob now sends out as a security deposit,
            placed on the BarterDEX network. The network’s encryption holds the
            deposit safely in view, but untouchable. We call this UTXO,
            &lt;bobdeposit&gt;. It will remain there until his side of the
            bargain completes in full, or until Alice’s request for a swap times
            out. Assuming Bob keeps his promises and stays alert, these funds
            will be automatically returned to him at the appropriate moment.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The second UTXO (100%) he retains within the safety of his own
            wallet for the moment. Performing a successful connection between
            Bob and Alice, and verifying their requisite UTXOs, is the most
            complex and difficult aspect of creating the BarterDEX network.
            Myriad factors are involved in a successful attempt for Bob and
            Alice to connect: human motivation; the experience level of the
            users; economics; connection technology; user hardware setups;
            normal variations within Internet connections; etc.
          </Typography>
          <Typography variant="body1" gutterBottom>
            We emphasize to users here that the process of performing these
            actions over a peer-to-peer network has almost an artistic element
            to it. An attempt to successfully connect Bob and Alice can be
            thought of more like fishing, where we must simply cast and recast
            our line until we successfully connect with our target. If a user
            attempts a trade and no response returns from the network, the user
            should slightly adjust the parameters of their offer and try again.
            As BarterDEX continues to iterate and improve, and as the number of
            users increases, we expect any required effort to lessen for users,
            the network, and the BarterDEX GUI apps
          </Typography>
          <Typography variant="h6" gutterBottom>
            Alice and Bob Make a Deal
          </Typography>
          <Typography variant="body1" gutterBottom>
            Assuming Alice and Bob are successfully connected, the process from
            this point forward becomes quite simple:
          </Typography>
          <Typography variant="body2" gutterBottom>
            (Note: in some cases, it is possible to perform an atomic swap with
            fewer steps, but for the sake of brevity we will focus only on this
            scenario.)
          </Typography>
          <Typography variant="body1" gutterBottom>
            A summary of the procedure:
            <ol>
              <li>
                Alice requests a swap and sends the &lt;dexfee&gt; to the
                BarterDEX full-relay nodes
                <ul>
                  <li>
                    The full-relay nodes receive her request and publish it to
                    the network
                  </li>
                </ul>
              </li>
              <li>
                Bob sees the request on the network, accepts it, and sends out
                &lt;bobdeposit&gt;{' '}
                <ul>
                  <li>
                    &lt;bobdeposit&gt; enters a state of limbo on the BarterDEX
                    network, held safely by encryption, awaiting either Alice to
                    proceed, or for the swap to time out <br /> i. If the latter
                    occurs, &lt;bobdeposit&gt; is automatically refunded to Bob
                    via the BarterDEX protocol
                  </li>
                </ul>
              </li>
              <li>
                Alice now sends her &lt;alicepayment&gt; to Bob{' '}
                <ul>
                  <li>
                    a. She does not send the payment to Bob directly, but rather
                    into a temporary holding wallet on the BarterDEX exchange,
                    which is encrypted and protected by his private keys <br />{' '}
                    i. Only Bob has access to this wallet, via the set of
                    privkeys that only he owns
                    <br /> ii. However, the BarterDEX code does not yet allow
                    Bob to unlock this temporary holding wallet; he must
                    continue his end of the bargain first <br /> iii. The
                    &lt;alicepayment&gt; will remain in Bob’s temporary holding
                    wallet for a limited amount of time, giving him the
                    opportunity to proceed{' '}
                  </li>
                </ul>
              </li>
              <li>
                Bob now sends his &lt;bobpayment&gt; to Alice
                <ul>
                  <li>
                    Again, this is not sent to Alice directly, but rather into
                    yet another temporary holding wallet
                  </li>
                  <li>
                    Likewise, only Alice has access to the necessary privkeys
                    for this wallet
                  </li>
                  <li>
                    The &lt;bobpayment&gt; will automatically be refunded if she
                    does not complete her part of the process
                  </li>
                </ul>
              </li>
              <li>
                Alice now “spends” the &lt;bobpayment&gt;
                <ul>
                  <li>
                    By the word “spends,” we simply mean that she activates her
                    privkeys and moves all the funds to another wallet—most
                    likely to her smart address
                  </li>
                  <li>
                    BarterDEX registers that Alice’s temporary holding wallet
                    successfully “spent” the funds
                  </li>
                </ul>
              </li>
              <li>
                Bob “spends” the &lt;alicepayment&gt;
                <ul>
                  <li>
                    a. Likewise, Bob simply moves the entirety of the
                    &lt;alicepayment&gt; into a wallet of his own—again, it will
                    most typically be his own smart address b. BarterDEX now
                    knows that Bob also successfully received his money
                  </li>
                </ul>
              </li>
              <li>
                Seeing both temporary holding wallets now empty, the BarterDEX
                protocol recognizes that the atomic swap was a complete success
                <ul>
                  <li>
                    BarterDEX now refunds &lt;bobdeposit&gt; back to Bob and the
                    process is complete.
                  </li>
                </ul>
              </li>
            </ol>
          </Typography>
          <Typography variant="body1" gutterBottom>
            While it may seem inefficient to have seven transactions for a swap
            that could be done with two, the complexity of this process provides
            us with the requisite “trustless-ness” to maintain user safety.
          </Typography>
          <Typography variant="h6" gutterBottom>
            Incentives and Disincentives to Maintain Good Behavior
          </Typography>
          <Typography variant="body1" gutterBottom>
            As we will now explain, at every step along the way there are
            incentives for each side to proceed, and there are various financial
            protections in place should one side fail. Also, because payments
            are sent to these “temporary holding wallets” that exist within the
            BarterDEX protocol, the protocol itself can assist in the process of
            moving money at the appropriate steps. Let us now examine what is
            happening at each step.
          </Typography>
          <Typography variant="button" gutterBottom>
            1 - Alice Sends &lt;dexfee&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            If Bob accepts the offer to trade, but does not send
            &lt;bobdeposit&gt;, Alice only stands to lose her &lt;dexfee&gt;
            UTXO. This is only 1/777th of the entire transaction amount, so she
            loses very little. Bob, on the other hand, stands to lose more.
            Since Bob did not follow through with his end of the bargain, the
            BarterDEX network indicates on his public BarterDEX trading profile
            that he failed in a commitment, thus decreasing his profile’s
            reputation. If Bob continues this behavior as a habit, he may find
            it difficult to discover trading partners. So long as the frequency
            of “Bobs” failing is low, the occasional extra &lt;dexfee&gt; paid
            by an Alice is a minor issue. However, if there is a sudden spike in
            misbehavior, the BarterDEX code has in-built contingency plans which
            can provide refunds to Alice(s), should a particular Alice node(s)
            experience a large loss via &lt;dexfee&gt;’s.
          </Typography>
          <Typography variant="button" gutterBottom>
            2 - Bob Successfully Sends &lt;bobdeposit&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            If Alice does not follow with her next step, the
            &lt;alicepayment&gt;, then Alice loses not only the &lt;dexfee&gt;,
            but she also receives a mark on her public BarterDEX profile. She
            gains nothing, and Bob has no reason to fear as &lt;bobdeposit&gt;
            will automatically return to him via the BarterDEX protocol.
          </Typography>
          <Typography variant="button" gutterBottom>
            3 - Alice Successfully Sends &lt;alicepayment&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            If Bob does not proceed with his next step, the &lt;bobpayment&gt;,
            then after 4 hours Alice can simply activate a BarterDEX protocol
            that will allow her to claim &lt;bobdeposit&gt;. Recall that
            &lt;bobdeposit&gt; is 112.5% of the original intended trade; Bob has
            every incentive therefore to continue with his end of the bargain,
            and Alice has nothing to fear should Bob fail. She even stands to
            gain a 12.5% bonus, at Bob’s expense.
          </Typography>
          <Typography variant="button" gutterBottom>
            4 - Bob Sends &lt;bobpayment&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            Now, if Alice does not follow by “spending” the &lt;bobpayment&gt;
            (i.e. taking the money out of the temporary holding wallet and into
            her own smart address), then after 2 hours Bob can activate a
            BarterDEX protocol that allows him to reclaim his &lt;bobpayment&gt;
            immediately. Furthermore, four hours later Bob may activate a refund
            of &lt;bobdeposit&gt;; Bob is safe from Alice, should she fail. For
            Alice, the BarterDEX protocol allows Alice to reclaim her
            &lt;alicepayment&gt; after Bob reclaims both of his payments.
            Everything herein is recorded to the respective users’ BarterDEX
            trading profiles, ensuring their reputations are on the line. Recall
            also that the BarterDEX protocol requires each step to be performed
            in the proper order, thus ensuring that neither party can take any
            funds before the users’ appropriate moment. Thus, at this integral
            stage of the process, every step of the path is intricately
            interconnected and maintains various levels of protection.
          </Typography>
          <Typography variant="button" gutterBottom>
            5 - Alice Spends &lt;bobpayment&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            At this point, Alice is entirely through with any risk to her
            reputation, her &lt;dexfee&gt; payment, or of the loss of her time.
            If Bob does not follow by also “spending” the &lt;alicepayment&gt;,
            it is of no concern to Alice because she has already received her
            funds. If Bob is simply sleeping and forgets to spend the
            &lt;alicepayment&gt;, he can only hurt himself. Naturally, for Bob
            this is slightly dangerous. Bob’s best course of action is to remain
            alert and spend the &lt;alicepayment&gt; once it is received. If
            after four hours, Bob is still sleeping, Alice can still activate
            the protocol that allows her to claim &lt;bobdeposit&gt;. In this
            scenario, she receives both the &lt;bobpayment&gt; and
            &lt;bobdeposit&gt;, at only the costs of the &lt;alicepayment&gt;
            and &lt;dexfee&gt;. Bob can still make a later claim for the
            &lt;alicepayment&gt; when he regains his awareness.
          </Typography>

          <Typography variant="button" gutterBottom>
            6 - Bob Spends &lt;alicepayment&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            Assuming all has gone according to plan, and having spent the
            &lt;alicepayment&gt;, Bob may now reclaim &lt;bobdeposit&gt;. Just
            as before, if Bob does not refund his own deposit, it is his loss;
            in four hours Alice will be able to activate a claim on
            &lt;bobdeposit&gt;.
          </Typography>

          <Typography variant="button" gutterBottom>
            7 - Bob Reclaims &lt;bobdeposit&gt;
          </Typography>
          <Typography variant="body1" gutterBottom>
            The process is complete. Alice received the &lt;bobpayment&gt;: Bob
            received the &lt;alicepayment&gt;: Bob has &lt;bobdeposit&gt; back
            in his own possession. The entire process only cost Alice the
            original &lt;dexfee&gt;. At each step along the way, the side that
            needs to take the next step is motivated to do so, with greater and
            greater urgency until the process is complete.
          </Typography>

          <Typography variant="h6" gutterBottom>
            For more information, please readl the Komodo white paper:
          </Typography>
          <ol>
            <li>
              <a
                href="https://komodoplatform.com/wp-content/uploads/2018/05/2018-05-09-Komodo-White-Paper-Full.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Komodo white paper
              </a>
            </li>
          </ol>
        </Grid>
      </Grid>
    );
  }
}

const HelpPageWapper = withStyles(styles)(HelpPage);

const Index = () => (
  <NavigationLayout>
    <ErrorBoundary>
      <MDCAppBar>
        <MDCHeader
          title={
            <Typography
              style={{
                flexGrow: 1
              }}
              variant="h6"
              color="inherit"
            >
              <FormattedMessage id="atomicapp.containers.HelpPage.title">
                {(...content) => content}
              </FormattedMessage>
            </Typography>
          }
        />
      </MDCAppBar>
      <HelpPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
