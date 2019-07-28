<template>
  <ApolloQuery
      :query="require('../graphql/campaings.gql')"
      :variables="{withResumeOfToday:true}"
    >      
    <template slot-scope="{ result: { loading, error, data } }">              
      <h2 v-if="loading || data === null">
        <LoadingAnimation />
      </h2>
      <section class="mt-3" v-else>
        <p>Tareas de:</p>
        <section v-if="data">
          Precio del huevo: s/ 5.8
          <b-tabs content-class="mt-3">
            <b-tab :title="`Galpon ${campaing.barn.name}`" v-for="campaing in data.campaings" :key="campaing.barn.name">
              <div>
                <ul>
                  <li>Cantidad de huevo recogidos:  {{campaing.resumeOfToday.quantityEggsCollected}}</li>
                  <li>Peso promedio por huevo:  {{campaing.averageWeightPerEgg}} kg</li>
                  <li>Peso total recogido: {{campaing.resumeOfToday.weightEggsCollected}} kg</li>
                  <li>Ingreso esperado: s/. {{campaing.resumeOfToday.amountIn}}</li>
                </ul>
                <ul>
                  <li>Alimento consumido: {{campaing.resumeOfToday.foodConsumed}} kg</li>
                  <li>Costo de alimento: s/. {{campaing.resumeOfToday.amountOut}}</li>
                </ul>
                <ul>
                  <li><b>Total: s/. {{amountTotal}}</b></li>
                </ul>
              </div>
            </b-tab>              
          </b-tabs>
        </section>
      </section>
    </template>
  </ApolloQuery>
</template>
