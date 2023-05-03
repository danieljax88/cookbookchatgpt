import { React, Fragment } from 'react'
import CustomSearchBox from '../src/ui/MuiSearch'
import InfiniteHits from '../src/ui/InfiniteHits'
import { InstantSearch } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite'
// import Comments from '../src/ui/Comments'

const searchClient = algoliasearch(
  '3NONBKD267',
  '1c15f9b7d67f66e32c75202a8ce4d6f1',
);

export default function CookBook() {

  return (
    <Fragment>
      {/* <Comments /> */}
      <InstantSearch indexName="algoliarecipes" searchClient={searchClient}>
        <CustomSearchBox />
        <InfiniteHits minHitsPerPage={6} />
      </InstantSearch>
    </Fragment >

  )

}

