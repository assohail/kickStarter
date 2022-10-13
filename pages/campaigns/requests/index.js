import Link from "next/link";
import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../../../components/Layout";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const address = props.query.address;
        return { address };
    }
    render () {
        return(
         <Layout>
            <h3>RI</h3>
               <Link href={`/campaigns/${this.props.address}/requests/new`}>
                    <Button content="Add Request" primary/>
                </Link> 
         </Layout>
        )
    }
    
}

export default RequestIndex;