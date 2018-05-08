<template>
  <section class="container">
    <div id="row">
      <div class="col-12 col-sm-8" id="komaview">
        <b-card no-body>
          <b-tabs card>
            <b-tab :busy.sync="isBusy" :title="`${i.lang}`" v-for="i in tabItem" :key="i.lang" :disabled="!i.exist">
              <img v-bind:src="i.img_src" align="middle" style="width: 100%; height: auto;"
                :hidden="typeof(i.img_src) === 'undefined' || i.img_src == ''">
              <br/>
              <b-button :href="i.links" variant="outline-primary" block>Source</b-button>
            </b-tab>
            <div slot="empty" class="text-center text-muted">
              Please select episode.
            </div>
          </b-tabs>
        </b-card>
      </div>
      <div class="col-12 col-sm-4" id="eplist">
        <b-table hover :items="provider"
          :busy.sync="isBusy"
          :fields="fields"
          :sort-by.sync="sortBy"
          @row-clicked="tabSelect">
          <template slot="id" slot-scope="row">Ep. {{ row.value }}</template>
        </b-table>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "nuxt-class-component";
import Route from "vue-router";
import axios from "axios";

function sleep(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component({
  watch: {
    $route: "syncTab"
  }
})
export default class extends Vue {
  isLoaded: boolean = false;
  isBusy: boolean;
  items: any[];
  tabItem: any[];

  data() {
    return {
      isLoaded: false,
      isBusy: false,
      fields: [{ key: "id", label: "Episode", sortable: true }],
      sortBy: "id",
      tabItem: []
    };
  }

  provider(ctx): Promise<object[]> {
    this.isBusy = true;
    let promise = axios.get(`/data/data.json`);

    return promise
      .then(data => {
        const items: object[] = data.data.data;
        this.isBusy = false;
        this.items = items;
        this.isLoaded = true;
        return this.items;
      })
      .catch(_ => {
        this.isBusy = false;
        return [];
      });
  }

  tabSelect(item, { route }): void {
    this.$router.replace({ query: { ep: item.id } });
  }

  langName(obj): string {
    console.log(obj);
    let name = Object.keys(obj)[0];
    switch (name) {
      case "ja":
        return "Japanese";
      case "en":
        return "English";
      default:
        return ""
    }
  }

  mounted(): void {
    this.syncTab();
  }

  syncTab(): void {
    this.selectTab(this.$route);
  }

  async selectTab({ query }): Promise<void> {
    if (typeof query.ep === "undefined") return void(0);
    while (true) {
      if (!this.isLoaded) {
        await sleep(100);
        continue;
      }
      let EpisodeID: number = Number(query.ep);
      this.tabSelector(EpisodeID);
      break;
    }
  }

  tabSelector(id: number): void {
    for (var i of this.items) {
      i._rowVariant = "";
    }
    this.tabItem = this.items[id].lang;
    this.items[id]._rowVariant = "info";
  }
}
</script>

<style>
@media screen and (min-width: 600px) {
  #komaview {
    float: right;
  }
  #eplist {
    float: left;
  }
}

#row {
  overflow: auto;
}
</style>
