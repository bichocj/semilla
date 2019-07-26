<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand to="/">La Semilla</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>        
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!--- <b-nav-item href="#">Link</b-nav-item> -->
          <b-nav-item-dropdown right>
            <template slot="button-content"><em>Resumen</em></template>
            <b-dropdown-item href="/resume/recojo">Recojo últimos 5 días</b-dropdown-item>
            <b-dropdown-item href="/resume/peso">Peso últimos 5 días</b-dropdown-item>
            <b-dropdown-item href="/resume/monto">Ingresos últimos 5 días</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>User</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="mx-3 mt-3">
    <nuxt />
    </div>
  </div>
</template>
