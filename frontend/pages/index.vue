<template>
  <div>
    <section v-if="books">
      <ul>
        <li v-for="book in books" :key="book.id">
          <router-link :to="`/book/${book.id}`" class='link'>            
            <h3>{{book.title}}</h3>
          </router-link>
        </li>
      </ul>
    </section>
    <h2 v-else>
      Loading...
    </h2>
  </div>
</template>

<script>
import gql from 'graphql-tag'
const bookS_PER_PAGE = 2
const books = gql`
  query getBooks {
    books{
      title
      author
    }
  }
`
export default {
  name: 'HomePage',
  data: () => ({
    loading: 0
  }),
  apollo: {
    $loadingKey: 'loading',
    books: {
      query: books,      
    },    
  },
  methods: {}
}
</script>

<style scoped>
ul {
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border: 1px solid #eee;
  overflow: hidden;
  border-radius: 5px;
}
.link {
  display: flex;
  color: #000;
}
.link:hover {
  box-shadow: 1px 1px 5px #999;
}
.placeholder {
  background-color: #eee;
  min-width: 100px;
  margin-right: 24px;
}
img {
  display: block;
  height: 100%;
}
.show-more-wrapper {
  display: flex;
  justify-content: center;
}
button {
  width: 100%;
  font-size: 16px;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  padding: 16px 24px;
  background: deepskyblue;
  border: none;
  border-radius: 0;
  cursor: pointer;
}
</style>