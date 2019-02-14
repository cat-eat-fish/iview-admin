<template>
  <Row :gutter="24">
    <Card>
      <Button>重新获取数据</Button>
      <div style="height:500px;" ref="dom"></div>
    </Card>
  </Row>
</template>

<script>
import {checkUser} from '@/api/user'
import {getUser,getToken} from '@/libs/util'
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'user_statistics',
  data () {
    return {
      dom: null,
    }
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    checkUser(getToken()).then(res=>{
      var data = res.data
    }).catch(err=>{
      console.log(err)
    })
    var dataCount = 900;
    var data = generateData(dataCount);
    var option = {
        title: {text: "用户统计表",left: 10},
        toolbox: {feature: {dataZoom: {yAxisIndex: 'none'},dataView: {readOnly: false},restore: {},saveAsImage: {pixelRatio: 2}}},
        tooltip: {trigger: 'axis',axisPointer: {type: 'shadow'},},
        legend: {data:['用户增长', '用户活跃']},
        grid: {bottom: 90},
        dataZoom: [{type: 'inside'}, {type: 'slider'}],
        xAxis: {data: data.categoryData,type: 'category',boundaryGap: false,silent: false,splitLine: {show: false},splitArea: {show: false},},
        yAxis: {type: 'value',axisLine: {onZero: false},axisLabel: {formatter: '{value} 人'},},
        series: [
          {name:'用户增长',type: 'bar',data: data.valueData,large: true},
          {name:'用户活跃',type: 'bar',data: data.other,large: true}
        ]
    };

    function generateData(count) {
        var baseValue = Math.random() * 10;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;
        function next(idx) {
            smallBaseValue = idx % 5 === 0 ? Math.random() * 7 : (smallBaseValue + Math.random() * 5 - 2);
            baseValue += Math.random() * 20 - 10;
            return Math.max(0, Math.round(baseValue + smallBaseValue) + 1);
        }
        var categoryData = [];
        var valueData = [];
        var other = [];
        for (var i = 0; i < count; i++) {
            categoryData.push(echarts.format.formatTime('yyyy-MM-dd', time));
            valueData.push(next(i)); //.toFixed(2)
            other.push(next(i)+2)
            time += 86400000; 
        }
        return {
            categoryData: categoryData,
            valueData: valueData,
            other:other
        };
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
    
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
