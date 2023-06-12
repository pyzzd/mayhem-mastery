<template>
  <div class="app-main">
    <h1 style="font-weight: lighter;font-size: 50px;color:wheat; margin: 30px 0 0 20px">大乱斗</h1>
    <div class="hero-cover" style="width: 100%;height: 500px">
      <img src="../assets/Leona.png" alt="common_pic" style="width: 100%; height: 100%;">
    </div>
    <div class="app-main-container">
      <div class="filter-box">
        <div class="component-select" style="margin-right: 20px">
          <input type="text" placeholder="搜索" v-model="searchWord" @input="search" style="width: 130px">
        </div>
        <div class="component-switch-filter">
          <div ref="allMenu"
               class="active"
               style="width: 90px;border: 1px solid #b59758;color: #b59758;"
               @click="menuChange('all',$event)">全部定位
          </div>
          <div ref="fighterMenu" @click="menuChange('fighter',$event)">战士</div>
          <div ref="mageMenu" @click="menuChange('mage',$event)">法师</div>
          <div ref="assassinMenu" @click="menuChange('assassin',$event)">刺客</div>
          <div ref="tankrMenu" @click="menuChange('tank',$event)">坦克</div>
          <div ref="marksmanMenu" @click="menuChange('marksman',$event)">射手</div>
          <div ref="supportMenu" @click="menuChange('support',$event)">辅助</div>
        </div>
      </div>
      <div class="table-bar">
        <div class="_update" style="color: #fff5e0;font-size: 14px;margin-bottom: 8px">数据更新时间：2023-06-09</div>
        <table class="data-table" border="0" cellspacing="0" cellpadding="0" style="border-spacing:0 10px;">
          <thead>
          <tr>
            <th style="width: 100px">
              <div class="icon-table-arrow">
                排名
                <span @click="rankSort">
                              <el-icon
                                  :style="{ color: (this.rankClick === 1) ? '' : (this.rankClick === 0 ? 'wheat' : ''),marginBottom: '-8px'}"><CaretTop/></el-icon>
              <el-icon :style="{ color: (this.rankClick === 1) ? (this.rankClick === 0 ? '' : 'wheat') : '' }"><CaretBottom/></el-icon>
              </span>
              </div>

            </th>
            <th style="width: 240px">英雄</th>
            <th>
              <div class="icon-table-arrow">
                胜率
                <span @click="winSort">
                  <el-icon
                      :style="{ color: (this.winClick === 0) ? '' : (this.winClick === 1 ? 'wheat' : ''),marginBottom: '-8px'}"><CaretTop/></el-icon>
              <el-icon :style="{ color: (this.winClick === 0) ? '' : (this.winClick === 1 ? '' : 'wheat') }"><CaretBottom/></el-icon>
              </span>
              </div>

            </th>
            <th>
              <div class="icon-table-arrow">
                登场率
                <span @click="appearSort">
                              <el-icon
                                  :style="{ color: (this.appearClick === 0) ? '' : (this.appearClick === 1 ? 'wheat' : ''),marginBottom: '-8px'}"><CaretTop/></el-icon>
              <el-icon :style="{ color: (this.appearClick === 0) ? '' : (this.appearClick === 1 ? '' : 'wheat') }"><CaretBottom/></el-icon>
              </span>
              </div>
            </th>
            <th>增强/削弱</th>
            <th>输出</th>
            <th>承伤</th>
            <th style="width: 420px">平衡性调整</th>
            <th>喊话复制</th>
          </tr>
          </thead>
          <tbody class="table-body">
          <tr style="border-bottom: .01rem solid #98958f;" v-for="data in heroDataList">
            <th>{{ data.hero.rank }}</th>
            <th style="text-align: left">
              <div class="hero-pic">
                <img :src="data.hero.avatar"
                     :alt="data.hero.title" style="width: 55px;text-align: center; vertical-align: middle;"/>
              </div>
              <span style="margin-left: 15px;display: inline-block; vertical-align: middle;">{{
                  data.hero.title + " - " + data.hero.name
                }}</span>
            </th>
            <th>{{ data.hero.win }}%</th>
            <th>{{ data.hero.appear }}%</th>
            <th :style="{ color: powerFontColor(data.power) }">{{ powerVerify(data.power) }}</th>
            <th>{{ damageVerify(data.damage) }}</th>
            <th>{{ injureVerify(data.injure) }}</th>
            <th style="padding: 10px">
              <p style="margin-bottom: 5px" v-for="item in data.properties">
                {{ item.indexOf("：") > -1 ? (item.split('：')[0] + "：") : item }}<span
                  :style="{ color: valueFontColor(item.split('：')[0],item.split('：')[1]) }">{{
                  item.split('：')[1]
                }}</span></p>
            </th>
            <th>
              <el-icon @click="heroInfoCopy(data.hero.title + '-'+ data.hero.name,data.properties)" style="cursor: pointer;">
                <CopyDocument/>
              </el-icon>
            </th>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>


</template>

<script>
import {heroData} from "@/http/api";
import {ElMessage} from "element-plus";
import useClipboard from 'vue-clipboard3'

export default {
  name: "Mobile",
  data() {
    return {
      heroDataArray: [],
      heroDataList: [],
      searchWord: "",
      rankClick: 0,
      winClick: 0,
      appearClick: 0,
    }
  },
  methods: {
    getHeroData() {
      heroData().then(r => {
        this.heroDataList = r.data;
        this.heroDataArray = r.data;
        this.heroDataList.sort(function (a, b) {
          return a.hero.rank - b.hero.rank;
        });
      }).catch(e => {
        ElMessage({message: e.message, type: 'error'})
      })
    },
    powerVerify(power) {
      if (power === 1) {
        return '削弱'
      } else if (power === 9) {
        return '增强'
      } else {
        return '无修改'
      }
    },
    powerFontColor(power) {
      if (power === 1) {
        return 'red'
      } else if (power === 9) {
        return 'green'
      } else {
        return ''
      }
    },
    valueFontColor(key, value) {
      if (value !== undefined) {
        if (key === '承伤') {
          if (parseInt(value.replace("%", "").replace("-", "").replace("+", "")) > 100) {
            return "red"
          } else {
            return "green"
          }
        } else {
          if (value.indexOf("%") > -1 || value.indexOf("+") > -1 || value.indexOf("-") > -1) {
            if (value.indexOf("+") > -1) {
              return "green"
            } else if (value.indexOf("-") > -1) {
              return "red"
            } else if (parseInt(value.replace("%", "").replace("-", "").replace("+", "")) > 100) {
              return "green"
            } else {
              return "red"
            }
          }
        }
      }
    },
    damageVerify(damage) {
      if (damage === 0) {
        return '无修改'
      } else {
        return damage + "%"
      }
    },
    injureVerify(injure) {
      if (injure === 0) {
        return '无修改'
      } else {
        return injure + "%"
      }
    },
    search() {
      if (this.searchWord.trim() === "") {
        this.heroDataList = this.heroDataArray;
      } else {
        return this.heroDataList.filter(hero => {
          const filteredHeroes = this.heroDataList.filter(hero => {
            // 使用正则表达式进行模糊匹配
            const regex = new RegExp(this.searchWord, "i");
            // 判断英雄的 keywords 是否有匹配项
            return hero.hero.keywords.some(keyword => regex.test(keyword));
          });
          // 将过滤后的数据列表赋值给 heroDataList
          this.heroDataList = filteredHeroes;
          return filteredHeroes;
        });
      }
    },
    rankSort() {
      this.winClick = 0;
      this.appearClick = 0;
      this.rankClick = this.rankClick ? 0 : 1;
      if (this.rankClick === 1) {
        this.heroDataList.sort(function (a, b) {
          return b.hero.rank - a.hero.rank;
        });
      } else {
        this.heroDataList.sort(function (a, b) {
          return a.hero.rank - b.hero.rank;
        });
      }
    },
    winSort() {
      this.rankClick = 3;
      this.appearClick = 0;
      this.winClick++;
      if (this.winClick === 3) {
        this.winClick = 0;
        this.rankClick = 0;
        this.heroDataList.sort(function (a, b) {
          return a.hero.rank - b.hero.rank;
        });
      } else if (this.winClick === 2) {
        this.heroDataList.sort(function (a, b) {
          return b.hero.win - a.hero.win;
        });
      } else {
        this.heroDataList.sort(function (a, b) {
          return a.hero.win - b.hero.win;
        });
      }
    },
    appearSort() {
      this.rankClick = 3;
      this.winClick = 0;
      this.appearClick++;
      if (this.appearClick === 3) {
        this.appearClick = 0;
        this.rankClick = 0;
        this.heroDataList.sort(function (a, b) {
          return a.hero.rank - b.hero.rank;
        });
      } else if (this.appearClick === 2) {
        this.heroDataList.sort(function (a, b) {
          return b.hero.appear - a.hero.appear;
        });
      } else {
        this.heroDataList.sort(function (a, b) {
          return a.hero.appear - b.hero.appear;
        });
      }
    },
    menuChange(occupation, event) {
      if (occupation === 'all') {
        this.removeBorder();
        event.target.style.border = '1px solid #b59758';
        event.target.style.color = '#b59758';
        this.heroDataList = this.heroDataArray;
      } else {
        this.removeBorder();
        event.target.style.border = '1px solid #b59758';
        event.target.style.color = '#b59758';
        this.heroDataList = this.heroDataArray;
        this.heroDataList = this.heroDataList.filter(item => item.hero.occupation.includes(occupation));
      }

    },
    removeBorder() {
      const allMenu = this.$refs.allMenu;
      const fighterMenu = this.$refs.fighterMenu;
      const mageMenu = this.$refs.mageMenu;
      const assassinMenu = this.$refs.assassinMenu;
      const tankrMenu = this.$refs.tankrMenu;
      const marksmanMenu = this.$refs.marksmanMenu;
      const supportMenu = this.$refs.supportMenu;
      allMenu.style.border = 'none';
      allMenu.style.color = '';
      fighterMenu.style.border = 'none';
      fighterMenu.style.color = '';
      mageMenu.style.border = 'none';
      mageMenu.style.color = '';
      assassinMenu.style.border = 'none';
      assassinMenu.style.color = '';
      tankrMenu.style.border = 'none';
      tankrMenu.style.color = '';
      marksmanMenu.style.border = 'none';
      marksmanMenu.style.color = '';
      supportMenu.style.border = 'none';
      supportMenu.style.color = '';
    },
    heroInfoCopy(name, attrs) {
      const {toClipboard} = useClipboard()
      let text = name += "，"
      attrs.forEach(r => {
        text += r += "，"
      })
      let copyText = text.substring(0, text.length - 1)
      toClipboard(copyText)
      ElMessage.success({message: copyText})
    }
  },
  mounted() {
    this.getHeroData()
  }
}
</script>

<style scoped>

.app-main {
  width: 100%;
  height: 100%;
}

.hero-cover {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.app-main-container {
  margin: 20px 0 0 20px;
  z-index: 999;
}

.filter-box {
  height: 45px;
  display: flex;
}

.filter-box div {
  height: 100%;
}

.component-switch-filter {
  display: flex;
  flex-direction: row;
}

.component-switch-filter div {
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  text-align: center;
  padding: 0 0.26rem;
  background-color: #282828;
  color: #5e625a;
  font-size: 14px;
  border: 1px solid #313537;
  box-sizing: border-box;
  height: 100%;
  width: 58px;
}

.component-switch-filter div:hover {
  color: #b59758;
  cursor: pointer;
}

.component-switch-filter div {
  text-decoration: none;
}

.hero-cover img {
  display: block;
  width: 100%;
  opacity: .6;
  -webkit-mask-image: linear-gradient(to bottom, #fff 0, #fff 60%, transparent 100%);
}

.table-bar {
  width: 100%;
  margin-top: 30px;
  /*background-color: rgba(255, 255, 255, 0.7);*/
}


.data-table thead th {
  position: relative;
  background-color: #202831;
  padding: 12px;
  border-collapse: collapse;
  width: 120px;
  color: #98958f;
  font-size: 15px;
}

.data-table thead th:not(:last-child):after {
  content: ""; /* 添加伪元素内容 */
  position: absolute; /* 设置绝对定位 */
  top: 50%;
  right: 0;
  height: 50%;
  width: .04rem;
  background-color: #98958f;
  transform: translateY(-50%); /* 调整线段的垂直位置 */
}


.table-body th {
  position: relative;
  border-collapse: collapse;
  color: #fff5e0;
  font-weight: lighter;
  font-size: 13px;
  background-color: #161a20;
  padding: 10px;
}

.data-table {
  border-collapse: collapse;
}

.data-table tr {
  border-bottom: none;
}

.component-select {
  width: 200px;
  height: 45px;
}

.component-select input {
  padding-left: 10px;
  height: 100%;
  width: 90%;
  border-radius: 4px;
  background-color: #282828;
  caret-color: wheat;
  color: white;
  outline: none;
  border-color: black;
  border-width: 1px;
  border-style: solid;
}

.component-select input:hover {
  border-color: wheat;
  transition: all 0.2s;
}

.component-select input:focus {
  border: 1px solid wheat;
}

.hero-pic {
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px;
}

.icon-table-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-table-arrow span {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-left: 6px;
  cursor: pointer;
}

.icon-table-arrow span:hover {
  color: rgba(245, 222, 179, 0.66);
  transition: all 0.3s;
}
</style>

