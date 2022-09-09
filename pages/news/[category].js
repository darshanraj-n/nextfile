function ListByCategory({ articles, category }) {
    return (
      <>
        <h1>Showing news for category {category}</h1>
        {articles.map(article => {
          return (
            <div key={article.id}>
              <h2>
                {article.id} {article.title}
              </h2>
              <p>{article.description}</p>
              <hr />
            </div>
          )
        })}
      </>
    )
  }
  
  export default ListByCategory
  
  export async function getServerSideProps(context) {
    const { params, req, res, query } = context
    const { category } = params
    const response = await fetch(`http://localhost:5000/news?category=${category}`)
    const data = await response.json()
  
    console.log(`Pre-rendering News Articles for category ${category}`) //build
    res.setHeader('Set-Cookie', ['name=Darshan'])
    console.log(req.headers.cookie)
    console.log(query)
    return {
      props: {
        articles: data,
        category
      }
    }
  }