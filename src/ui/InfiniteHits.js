import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import PropTypes from 'prop-types';
import Hit from './Hit';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';


class InfiniteHits extends Component {
    static propTypes = {
        hits: PropTypes.arrayOf(PropTypes.object).isRequired,
        hasMore: PropTypes.bool.isRequired,
        refineNext: PropTypes.func.isRequired,
    };

    sentinel = null;

    onSentinelIntersection = entries => {
        const { hasMore, refineNext } = this.props;

        entries.forEach(entry => {
            if (entry.isIntersecting && hasMore) {
                refineNext();
            }
        });
    };

    componentDidMount() {
        this.observer = new IntersectionObserver(this.onSentinelIntersection);

        this.observer.observe(this.sentinel);
    }

    componentWillUnmount() {
        this.observer.disconnect();
    }

    render() {
        const { hits } = this.props;
        return (
            <Container>
                < Grid container justify="center" alignItems="center" direction="row" marginTop="30px" >
                    <Grid container spacing={3}>

                        {hits.map(hit => (

                            <Hit key={hit.id} hit={hit} />
                        ))}
                        <li
                            ref={c => (this.sentinel = c)}
                        />
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default connectInfiniteHits(InfiniteHits);
