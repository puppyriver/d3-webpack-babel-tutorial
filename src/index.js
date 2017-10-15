import * as d3 from 'd3'; 

const square = d3.selectAll("rect");
square.style("fill", "orange"); 

    let update = function(){
        console.log("update ...");
        var link = this.vis.selectAll("line.link")
            .data(this.links, function(d) { return d.source.id + "-" + d.target.id; })
            .attr("class", function(d){
                return d['source']['status'] && d['target']['status'] ? 'link' :'link link_error';
            });

        link.enter().insert("svg:line", "g.node")
            .attr("class", function(d){
                return d['source']['status'] && d['target']['status'] ? 'link' :'link link_error';
            });

        link.exit().remove();

        var node = this.vis.selectAll("g.node")
            .data(this.nodes, function(d) { return d.id;});

        var nodeEnter = node.enter().append("svg:g")
            .attr("class", "node")
            .call(this.force.drag);

        //增加图片，可以根据需要来修改
        var self=this;
        nodeEnter.append("svg:image")
            .attr("class", "circle")
            .attr("xlink:href", function(d){
                //根据类型来使用图片
                return d.expand ? "http://ww2.sinaimg.cn/large/412e82dbjw1dsbny7igx2j.jpg" : "http://ww4.sinaimg.cn/large/412e82dbjw1dsbnxezrrpj.jpg";
            })
            .attr("x", "-32px")
            .attr("y", "-32px")
            .attr("width", "64px")
            .attr("height", "64px")
            .on('click',function(d){ d.expand && self.clickFn(d);})

        nodeEnter.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 15)
            .attr("dy", -35)
            .text(function(d) { return d.id });


        node.exit().remove();

        this.force.start();
    }


    let test = (ele)=> {
        typeof(ele)=='string' && (ele=document.getElementById(ele));
        var w=ele.clientWidth,
            h=ele.clientHeight,
            self=this;
        console.log('d3'+d3);
        this.force = d3.forceSimulation().gravity(.05).distance(200).charge(-800).size([w, h]);
        this.nodes=this.force.nodes();
        this.links=this.force.links();
        this.clickFn=function(){};
        this.vis = d3.select(ele).append("svg:svg")
            .attr("width", w).attr("height", h).attr("pointer-events", "all");

        this.force.on("tick", function(x) {
            self.vis.selectAll("g.node")
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

            self.vis.selectAll("line.link")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        });

        console.log(div);


        var d_nodes=[
            {id:'10.4.42.1',type:'router',status:1},
            {id:'10.4.43.1',type:'switch',status:1,expand:true},
            {id:'10.4.44.1',type:'switch',status:1},
            {id:'10.4.45.1',type:'switch',status:0}

        ];

        var childNodes=[
            {id:'10.4.43.2',type:'switch',status:1},
            {id:'10.4.43.3',type:'switch',status:1}

        ];

        var d_links=[
            {source:'10.4.42.1',target:'10.4.43.1'},
            {source:'10.4.42.1',target:'10.4.44.1'},
            {source:'10.4.42.1',target:'10.4.45.1'}
        ];

        var childLinks=[
            {source:'10.4.43.1',target:'10.4.43.2'},
            {source:'10.4.43.1',target:'10.4.43.3'},
            {source:'10.4.43.2',target:'10.4.43.3'}
        ]

        d_nodes.forEach(n=>nodes.push(n));
        d_links.forEach(l=>links.push(l));

        console.log("updating... ");
        this.update();
        console.log("updated");
    }
    
    test('topo');