<template>
  <b-modal modal-class="columns-settings-modal" title-class="ml-auto" v-model="modal" centered @ok="$_saveSettings" @hidden="$_loadFromModel" size="lg" title="Columns settings" ok-title="Save" body-class="py-0">
    <div class="row">
      <div class="col-6 py-3 items-col items-col-visibility">
        <div class="row mb-1">
          <h6 class="col font-weight-bold">Columns visibility</h6>
          <div class="col pl-0">
            <input class="col" type="search" placeholder="Search..." v-model="searchModel" />
          </div> 
        </div>
        <b-list-group>
          <b-list-group-item class="p-0" v-for="(col, index) in displayModel" v-show="$c_searchResultIndex === null || $c_searchResultIndex[index]" :key="index">
            <label role="colitem" class="w-100 m-0 py-1 px-2">
              <input type="checkbox" :true-value="true" :false-value="false" v-model="col.display" />
              {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content }}
              <i v-if="col.header.info"
                v-b-tooltip="{ hover: true, html: true, title: col.header.info, boundary: 'window' }"
                class="fa fa-info-circle info-icon"></i>
            </label>
          </b-list-group-item>
          <div class="space"></div>
        </b-list-group>
      </div>
      <div class="col-6 py-3 items-col items-col-order">
        <div class="row mb-1">
          <h6 class="col font-weight-bold">Columns order</h6>
        </div>
        <b-list-group>
          <draggable v-model="model" @start="drag = true" @end="drag = false" v-bind="{ animation: 200, group: 'description', disabled: false, ghostClass: 'ghost' }">
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <b-list-group-item class="p-0" v-for="(col, index) in model" v-show="col.display" :key="`item-${index}`">
                <div class="draggable-item-wrapper w-100 m-0 py-1 px-2">
                  <span>
                    {{ typeof col.header.content == 'function' ? col.header.content() : col.header.content }}
                  </span>
                  <svg class="draggable_icon pull-right mt-1" width="10px" height="14px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="Outlined" transform="translate(-617.000000, -246.000000)">
                              <g id="Action" transform="translate(100.000000, 100.000000)">
                                  <g id="Outlined-/-Action-/-drag_indicator" transform="translate(510.000000, 142.000000)">
                                      <g>
                                          <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                          <path d="M11,18 C11,19.1 10.1,20 9,20 C7.9,20 7,19.1 7,18 C7,16.9 7.9,16 9,16 C10.1,16 11,16.9 11,18 Z M9,10 C7.9,10 7,10.9 7,12 C7,13.1 7.9,14 9,14 C10.1,14 11,13.1 11,12 C11,10.9 10.1,10 9,10 Z M9,4 C7.9,4 7,4.9 7,6 C7,7.1 7.9,8 9,8 C10.1,8 11,7.1 11,6 C11,4.9 10.1,4 9,4 Z M15,8 C16.1,8 17,7.1 17,6 C17,4.9 16.1,4 15,4 C13.9,4 13,4.9 13,6 C13,7.1 13.9,8 15,8 Z M15,10 C13.9,10 13,10.9 13,12 C13,13.1 13.9,14 15,14 C16.1,14 17,13.1 17,12 C17,10.9 16.1,10 15,10 Z M15,16 C13.9,16 13,16.9 13,18 C13,19.1 13.9,20 15,20 C16.1,20 17,19.1 17,18 C17,16.9 16.1,16 15,16 Z" id="🔹-Icon-Color" fill="#1D1D1D"></path>
                                      </g>
                                  </g>
                              </g>
                          </g>
                      </g>
                  </svg>
                </div>
              </b-list-group-item>
            </transition-group>
          </draggable>
          <div class="space"></div>
        </b-list-group>
      </div>
    </div>
  </b-modal>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  name: 'columnSettingsModal',
  components: { draggable },
  props: {
    value: { type: Array, default: () => [] }
  },
  data () {
    return {
      modal: false,
      drag: false,
      model: [],
      displayModel: [],
      searchModel: '',
    }
  },
  created () {
    this.$watch('displayModel', () => {
      this.drag = true;
      this.model.forEach(headerItem => {
        headerItem.display = this.$c_headersMap[headerItem.item.key].display
      })
      this.$nextTick(() => {
        this.drag = false;
      })
    }, { deep: true });

    this.$watch('value', () => {
      this.$_loadFromModel();
    }, { immediate: true });

  },
  computed: {
    $c_searchResultIndex() {
      if (this.searchModel) {
        const searchValue = this.searchModel.trim().toLowerCase();
        return this.displayModel.map(({ header: { content } }) => {
          const value = typeof content === 'function' ? `${content()}` : `${content}`
          return value.toLowerCase().includes(searchValue)
        })
      }
      return null;
    },
    $c_headersMap() {
      const map = {};
      this.displayModel.forEach((headerItem) => { map[headerItem.item.key] = headerItem; });
      return map;
    },
  },
  methods: {
    show () {
      this.modal = true
    },
    hide () {
      this.modal = false
    },
    $_saveSettings () {
      this.$emit('save', this.model)
      this.$emit('input', this.model)
    },
    $_loadFromModel () {
      this.displayModel = this.value.map(item => Object.assign({}, item))
      this.model = [...this.displayModel];
      this.searchModel = '';
    }
  }
}
</script>

<style lang="scss">
.modal.columns-settings-modal {
  .modal-dialog {
    .modal-content {
      .modal-body {
        .items-col {
          &.items-col-visibility {
            border-right: 1px solid #dee2e6;
          }
          &.items-col-order {
            .list-group-item {
              cursor: grab;
            }
            .flip-list-move {
              transition: transform 0.5s;
            }
            .no-move {
              transition: transform 0s;
            }
            .ghost {
              opacity: 0.5;
              background: #ededed;
            }
          }
          .list-group {
            max-height: 450px;
            overflow-y: auto;
            .space {
              height: 5px;
              width: 5px;
            }
          }
          .list-group-item {
            margin-bottom: -1px;
            border: 1px solid rgba(0, 0, 0, 0.125);
            label {
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>