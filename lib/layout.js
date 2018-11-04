import React from 'react'
import Layout from '../components/MyLayout'

export default (page) => (<Layout>{page()}</Layout>)