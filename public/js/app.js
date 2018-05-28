class ProductList extends React.Component {
  state = {
    products: []
  };
  componentDidMount() {
    this.setState({
      products: Seed.products.sort((a, b) => a.votes - b.votes)
    });
  }
  handleClickUpVote = id => {
    let products = this.state.products.slice();
    products.forEach(product => {
      if (product.id === id) {
        product.votes++;
      }
    });
    this.setState({ products: products });
  };
  render() {
    const productComponents = this.state.products.map(product => (
      <Product
        key={"product-" + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onClick={this.handleClickUpVote}
      />
    ));
    return <div className="ui unstackable items">{productComponents}</div>;
  }
}

class Product extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="image">
          <img src={this.props.productImageUrl} alt="" />
        </div>
        <div className="middle aligned content">
          <div className="header">
            <a>
              <i
                className="large caret up icon"
                onClick={() => this.props.onClick(this.props.id)}
              />
            </a>
            {this.props.votes}
          </div>
          <div className="description">
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className="extra">
            <span>Submitted by:</span>
            <img
              src={this.props.productImageUrl}
              alt=""
              className="ui avatar image"
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ProductList />, document.getElementById("content"));
