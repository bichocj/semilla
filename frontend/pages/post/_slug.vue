<template>
  <h2 v-if="loading > 0">
    Loading...
  </h2>
  <div v-else>
    <article>
      <h1>{{post.title}}</h1>
      <div class='placeholder'>
        <img
          :alt="post.title"
          :src="`https://media.graphcms.com/resize=w:650,h:366,fit:crop/${post.coverImage.handle}`"
        />
      </div>
    </article>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  const post = gql`
    query post($id: ID!) {
      post(where: {id: $id}) {
        id
        slug
        title
        coverImage {
          handle
        }
        content
        dateAndTime
      }
    }
  `
  export default {
    name: 'PostPage',
    data: () => ({
      loading: 0
    }),
    apollo: {
      $loadingKey: 'loading',
      post: {
        query: post,
        variables () {
          return {
            id: this.$route.params.slug
          }
        }
      }
    },
  }
</script>

<style scoped>
  .placeholder {
    height: 366px;
    background-color: #eee;
  }
</style>