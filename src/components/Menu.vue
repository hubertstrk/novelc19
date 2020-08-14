<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <b-icon
          icon="poll"
          size="is-small">
        </b-icon>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item tag="router-link" :to="{ name: 'world' }">
        World
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'countries' }">
        Countries
      </b-navbar-item>
      <b-navbar-item tag="router-link" :to="{ name: 'countryTrend' }">
        Trend
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="router-link" :to="{ name: 'about' }">
        About
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
