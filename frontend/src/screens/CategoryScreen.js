import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { listCategories } from '../actions/categoryAction'
import Category from '../components/Category'
import { categoryListReducer } from '../reducers/categoryReducers'
import { useSelector, useDispatch } from 'react-redux'


const CategoryScreen = () => {
    const [category, setCategory] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => { dispatch(listCategories()) }, [dispatch])

    const categoryList = useSelector(state => state.categories);


    return (
        <div>

        </div>
    )
}

export default CategoryScreen
