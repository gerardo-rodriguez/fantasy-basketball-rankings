<template>
  <div class="container">
    <svg id="visualization" width="1000" height="500"></svg>
  </div>
</template>

<script>
  export default {
    mounted () {
      const vis = d3.select('#visualization');

      // const xScale = d3.scaleLinear().range(
      //   [MARGINS.left, WIDTH - MARGINS.right]
      // ).domain(
      //   d3.extent([...this.info, ...this.info2], function (d) {
      //     return d.category; // [2000, 2010]
      //   })
      // );

      const xScale = d3.scalePoint()
        .range([MARGINS.left, WIDTH - MARGINS.right])
        .domain(
          this.teams[0].rankings.reduce((arr, ranking) => {
            arr.push(ranking.category);
            return arr;
          }, [])
        );

      const yScale = d3.scaleLinear()
        .range([MARGINS.bottom, HEIGHT - MARGINS.top])
        .domain([1, this.teams.length]);
        // .domain(d3.extent([...this.info, ...this.info2], function (d) {
        //   return d.rank; // [134, 215]
        // }));

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      const dataLine = d3.line()
        .x(function (d) {
          return xScale(d.category);
        })
        .y(function (d) {
          return yScale(d.rank);
        });

      // Create x axis using xAxis
      vis.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${HEIGHT - MARGINS.bottom})`)
        .call(xAxis);

      // Create y axis using yAxis
      vis.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${MARGINS.left}, 0)`)
        .call(yAxis);

      this.teams.forEach(team => {
        const isSelectedTeam = team.id === this.selectedTeamId;
        const strokeColor = isSelectedTeam ? 'red' : 'blue';
        const strokeWidth = isSelectedTeam ? 2 : 1;

        vis.append('path')
          .attr('d', dataLine(team.rankings))
          .attr('stroke', strokeColor)
          .attr('stroke-width', strokeWidth)
          .attr('fill', 'none');
      });
    }
  };
</script>

<style>
</style>
