import React, { useState } from 'react';
import Button from './Button'
import { connect } from 'react-redux'
import { doFetchStories } from '../actions/story'


const SearchStories = ({onFetchStories, }) =>  {
    const [query, setQuery] = useState('')

    const onSubmit = (event) => {
        if(query) {
            onFetchStories(query)
            setQuery('')
        }
        event.preventDefault()
    }
    
    const onChange = (event) => {
        const { value } = event.target
        setQuery(value)
    }

    return (
        <form onSubmit={onSubmit}>
        <input 
            type="text"
            value={query}
            onChange={onChange}
        />
        <Button type="submit">
            Search
        </Button>
        </form>
    )
}

const mapDispatchToProps = dispatch => ({
    onFetchStories: query => dispatch(doFetchStories(query))
})

export default connect(null, mapDispatchToProps)(SearchStories)