import React from 'react';
import CustomGridList from '../../components/CustomGridList';
import { Category } from '../../models/category/Category';

export default class Categories extends React.Component {

    private categories: Category[];

    constructor(props: any) {
        super(props);
        this.categories = [];
    }

    public componentWillMount() {
        const image: string = "https://material-ui.com/static/images/grid-list/breakfast.jpg";
        this.categories = [
            { "id": 0, "name": "Fruit", "image": image },
            { "id": 1, "name": "Meat", "image": image },
            { "id": 2, "name": "Started", "image": image }
        ];
    }

    public render() {
        return <CustomGridList list={this.categories}/>;
    }
}