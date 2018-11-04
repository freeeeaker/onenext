import React from 'react'
import { withRouter } from 'next/router'
import Layout from '../components/MyLayout'

const Page = withRouter((props) => (
  <Layout>
    <h1>{props.router.query.title}</h1>
    <p>this i s the blog content</p>
  </Layout>
))

export default Page