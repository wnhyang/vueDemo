var app=new Vue({
    el:"#app",
    data:{
        // 查询关键字
        query:"",
        // 歌曲数据
        musicList:[],
        // 歌曲地址
        musicUrl:"",
        // 歌曲图片
        musicCover:"",
        // 歌曲评论
        hotComments:[],
        // 动画播放状态
        isPlaying:false,
        // 遮罩层显示状态
        isShow:false,
        // MV地址
        mvUrl:""
    },
    methods:{
        searchMusic:function(){
            // console.log(this.query);
            var that=this;
            axios.get('https://autumnfish.cn/search?keywords='+this.query)
            .then(function(response){
                // console.log(response);
                that.musicList=response.data.result.songs;
                console.log(response.data.result.songs)
            },function(error){
                console.log(error);
            })
        },
        playMusic:function(musicId){
            // console.log(musicId);
            var that=this;
            // 歌曲地址
            axios.get('https://autumnfish.cn/song/url?id='+musicId)
            .then(function(response){
                // console.log(response);
                console.log(response.data.data[0].url);
                that.musicUrl=response.data.data[0].url;
            },function(error){
                console.log(error);
            })
            // 歌曲图片
            axios.get('https://autumnfish.cn/song/detail?ids='+musicId)
            .then(function(response){
                // console.log(response);
                console.log(response.data.songs[0].al.picUrl);
                that.musicCover=response.data.songs[0].al.picUrl;
            },function(error){
                console.log(error);
            })
            // 歌曲评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id='+musicId)
            .then(function(response){
                // console.log(response);
                console.log(response.data.hotComments);
                that.hotComments=response.data.hotComments;
            },function(error){
                console.log(error);
            })
        },
        play:function(){
            console.log("play");
            this.isPlaying=true;
        },
        pause:function(){
            console.log("pause");
            this.isPlaying=false;
        },
        playMV:function(mvid){
            var that=this;
            axios.get('https://autumnfish.cn/mv/url?id='+mvid)
            .then(function(response){
                // console.log(response);
                console.log(response.data.data.url);
                that.isShow=true;
                that.mvUrl=response.data.data.url;
            },function(error){
                console.log(error);
            })
        },
        hide:function(){
            this.isShow=false;
        }
    }
})