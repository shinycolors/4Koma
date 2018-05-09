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
              <b-button :href="i.links" class="external-links" variant="outline-primary" block>Source</b-button>
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
import axios from "axios";
import { Component, Provide, Vue, Watch } from "nuxt-property-decorator";
import Route from "vue-router";

function sleep(ms): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

@Component
export default class extends Vue {
  @Provide()
  public fields: object[] = [{ key: "id", label: "Episode", sortable: true }];
  @Provide() public isBusy: boolean = false;
  @Provide() public items: any[] = [];
  @Provide() public sortBy: string = "id";
  @Provide() public tabItem: any[] = [];
  @Provide() protected isLoaded: boolean = false;

  public provider(ctx): Promise<object[]> {
    this.isBusy = true;

    return axios
      .get(`/data/data.json`)
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

  public tabSelect(item, { route }): void {
    this.$router.replace({ query: { ep: item.id } });
  }

  public langName(obj): string {
    switch (Object.keys(obj)[0]) {
      case "ja":
        return "Japanese";
      case "en":
        return "English";
      default:
        return "";
    }
  }

  protected async selectTab({ query }): Promise<void> {
    if (typeof query.ep === "undefined") {
      return void 0;
    }
    while (true) {
      if (!this.isLoaded) {
        await sleep(100);
        continue;
      }
      this.tabSelector(Number(query.ep));
      break;
    }
  }

  protected mounted() {
    this.onRouteChanges();
  }

  protected tabSelector(id: number): void {
    for (const i of this.items) {
      i._rowVariant = "";
    }
    this.tabItem = this.items[id].lang;
    this.items[id]._rowVariant = "info";
  }

  @Watch("$route")
  protected async onRouteChanges() {
    this.selectTab(this.$route);
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
