<template>
  <ApolloMutation
    :mutation="require('./graphql/deleteCollect.gql')"
    :variables="{id: collectionId}"
    @done="onDelete"
  >
    <template slot-scope="{ mutate, loading, error }">    
      <b-button variant="danger" @click="() => { mutate() }">
        Eliminar
      </b-button>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: [
    'collectionId',
    'onDelete'
  ]  
}
</script>
