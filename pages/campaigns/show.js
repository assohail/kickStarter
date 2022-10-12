import {React, Component} from "react";
import { Card, Menu, Link, Grid, GridColumn, GridRow, Button} from "semantic-ui-react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import ContributeForm from "../../components/contributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log(summary);
    return {
      addres: props.query.address,
      minimumContribution: summary[0], 
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    }
  }

  renderCards() {
    const {
      balance, 
      manager,
      minimumContribution,
      requestsCount,
      approversCount
    } = this.props
    const items = [
      {
        header: manager,
        meta:"Address of Manager",
        description: "Manager created the campaign and can create requests to withdraw money.",
        style: {overflowWrap: 'break-word'}
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description: 'You must contribute at least this much wei to be a contributor.',
        style: {overflowWrap: 'break-word'}
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the contract. It must be approved by approvers for withdrawl by manager.",
        style: {overflowWrap: 'break-word'}
      },
      {
        header: approversCount,
        meta: "No of Approvers",
        description: "Total approvers who can approve requests.",
        style: {overflowWrap: 'break-word'}
      },
      {
        header: balance,
        meta: "Contract Balance",
        description: "This is the max balance for the campaign that can be withdrawn by the manager.",
        style: {overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items} />;
  }

    render() {
        return (
          <Layout>
            <h3>Campaign Show</h3>
            <Grid>
              <GridRow>
                <GridColumn width={10}>
                  {this.renderCards()}
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn width={6}>
                  <ContributeForm address={this.props.addres}/>
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  {/* <Link route='/' href={'/campaigns/requests'}> */}
                    <a><Button primary>View Requests</Button></a>
                  {/* </Link> */}
                </GridColumn>
              </GridRow>
                
            </Grid>
          </Layout>
        )
    }
}

export default CampaignShow;