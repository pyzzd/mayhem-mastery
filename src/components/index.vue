<template>
  <div class="app-main">
    <h1 style="font-weight: lighter;font-size: 50px;color:wheat; margin: 30px 0 0 50px">大乱斗</h1>
    <div class="hero-cover" style="width: 100%;height: 500px">
      <img src="../assets/Leona.png" alt="common_pic" style="width: 100%; height: 100%;">
    </div>
    <div class="app-main-container">
      <div class="filter-box">
        <div class="component-select" style="margin-right: 20px">
          <input type="text" placeholder="搜索">
        </div>
        <div class="component-switch-filter">
          <a href="" class="active"
             style="width: 120px;border: 2px solid #b59758;color: #b59758;margin-right: -1px;">全部定位</a>
          <a href="">战士</a>
          <a href="">法师</a>
          <a href="">刺客</a>
          <a href="">坦克</a>
          <a href="">射手</a>
          <a href="">辅助</a>
        </div>
      </div>
      <div class="table-bar">
        <div class="_update" style="color: #fff5e0;font-size: 13px;margin-bottom: 8px">数据更新时间：2023-06-09</div>
        <table class="data-table" border="0" cellspacing="0" cellpadding="0" style="border-spacing:0 10px;">
          <thead>
          <tr>
            <th style="width: 100px">排名</th>
            <th style="width: 240px">英雄</th>
            <th>胜率</th>
            <th>登场率</th>
            <th>增强/削弱</th>
            <th>输出</th>
            <th>承伤</th>
            <th style="width: 420px">平衡性调整</th>
            <th>喊话复制</th>
          </tr>
          </thead>
          <tbody class="table-body">
          <tr style="border-bottom: .01rem solid #98958f;" v-for=" data in heroDataList">
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
              <p style="margin-bottom: 5px" v-for=" item in data.properties">
                {{ item.indexOf("：") > -1 ? (item.split('：')[0] + "：") : item }}<span
                  :style="{ color: valueFontColor(item.split('：')[0],item.split('：')[1]) }">{{ item.split('：')[1] }}</span></p>
            </th>
            <th>
              <el-icon>
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
import {ref} from 'vue'
import {heroData} from "@/http/api";
import {ElMessage} from "element-plus";

export default {
  name: "index",
  data() {
    return {
      heroDataList: []
    }
  },
  methods: {
    getHeroData() {
      heroData().then(r => {
        this.heroDataList = r.data;
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
        if (key === '承伤'){
          if (parseInt(value.replace("%", "").replace("-", "").replace("+", "")) > 100) {
            return "red"
          } else {
            return "green"
          }
        }else{
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
  margin: 20px 0 0 60px;
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

.component-switch-filter a {
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
  width: 82px;
}

.component-switch-filter a:hover {
  color: #b59758;
}

a {
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

.data-table tbody th:not(:last-child)::after {
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
</style>

