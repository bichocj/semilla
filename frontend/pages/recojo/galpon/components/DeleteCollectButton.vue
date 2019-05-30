<template>
  <ApolloMutation
    :mutation="require('./graphql/deleteCollect.gql')"
    :variables="{id: collectionId}"
    @done="onDelete"
  >
    <template slot-scope="{ mutate, loading, error }">      
      <div v-if="row.detailsShowing === false ">
        <b-button size="sm" variant="danger" @click="row.toggleDetails">
          Eliminar
        </b-button>
      </div>
      <div v-else class="d-flex">
        <b-button size="sm" variant="danger" @click="() => { mutate() }" class="mr-1 px-4">
          Si
        </b-button>
        <b-button size="sm" @click="row.toggleDetails"  class="ml-1 px-4">
          No
        </b-button>
      </div>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  props: [
    'collectionId',
    'onDelete',
    'row'
  ]  
}
</script>
