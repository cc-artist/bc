// 模拟数据库数据

// 寺庙数据
const templesData = [
  {
    id: 1,
    name: "南华寺",
    location: "广东省韶关市曲江区马坝镇",
    title: "禅宗祖庭，六祖慧能弘法道场",
    description: "南华寺是中国佛教禅宗的重要祖庭，六祖慧能在此弘法37年，是禅宗南宗的发祥地。寺内保存有六祖慧能的真身像，以及大量珍贵的佛教文物。",
    image: "/temple-images/南华寺.webp",
    features: [
      "禅宗祖庭，历史悠久",
      "六祖慧能真身像供奉地",
      "保存大量珍贵佛教文物",
      "环境清幽，适合参禅冥想",
      "专业禅修导师指导"
    ],
    route: {
      transport: "高铁直达韶关站，转乘公交车或专车",
      itinerary: "第一天：抵达韶关，入住酒店，晚课体验；第二天：南华寺早课，参观六祖殿、大雄宝殿，禅修体验；第三天：参访周边景点，返程。",
      combination: "可与丹霞山、乳源大峡谷等景点组合"
    },
    culture: [
      "禅宗文化体验",
      "六祖慧能生平事迹讲解",
      "禅修课程体验",
      "佛教艺术鉴赏",
      "素食文化体验"
    ],
    highlights: [
      "禅宗南宗的发祥地",
      "六祖慧能真身像供奉地",
      "环境清幽，适合参禅冥想"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "少林寺",
    location: "河南省郑州市登封市嵩山五乳峰下",
    title: "天下功夫出少林，禅宗祖庭",
    description: "少林寺是世界著名的佛教寺院，也是中国功夫的发源地。寺内保存有大量的历史文物和佛教艺术品，是中国佛教禅宗的重要祖庭之一。",
    image: "/temple-images/少林寺.webp",
    features: [
      "中国功夫发源地",
      "禅宗祖庭之一",
      "保存大量历史文物",
      "功夫表演精彩绝伦",
      "嵩山自然风光秀美"
    ],
    route: {
      transport: "高铁直达郑州站，转乘专线车",
      itinerary: "第一天：抵达郑州，入住酒店；第二天：参观少林寺，观看功夫表演，参观塔林；第三天：登嵩山，参访嵩阳书院，返程。",
      combination: "可与龙门石窟、白马寺等景点组合"
    },
    culture: [
      "少林功夫体验",
      "禅宗文化讲解",
      "佛教艺术鉴赏",
      "嵩山文化体验",
      "传统武术学习"
    ],
    highlights: [
      "中国功夫的发源地",
      "禅宗祖庭之一",
      "精彩绝伦的功夫表演"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "灵隐寺",
    location: "浙江省杭州市西湖区灵隐路",
    title: "江南古刹，济公活佛道场",
    description: "灵隐寺是中国佛教禅宗十大古刹之一，始建于东晋咸和元年，已有1600多年的历史。寺内环境清幽，古树参天，是杭州著名的旅游景点。",
    image: "/temple-images/灵隐寺.webp",
    features: [
      "江南古刹，历史悠久",
      "济公活佛道场",
      "环境清幽，古树参天",
      "毗邻西湖，风景秀丽",
      "佛教文化底蕴深厚"
    ],
    route: {
      transport: "飞机或高铁直达杭州，地铁或公交可达",
      itinerary: "第一天：抵达杭州，入住酒店，游西湖；第二天：参观灵隐寺、飞来峰，品素斋；第三天：参访周边景点，返程。",
      combination: "可与西湖、千岛湖等景点组合"
    },
    culture: [
      "佛教文化体验",
      "济公文化讲解",
      "飞来峰石刻艺术鉴赏",
      "江南园林文化体验",
      "素食文化体验"
    ],
    highlights: [
      "中国佛教禅宗十大古刹之一",
      "济公活佛道场",
      "毗邻西湖，风景秀丽"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "寒山寺",
    location: "江苏省苏州市姑苏区寒山寺弄24号",
    title: "枫桥夜泊，千古名刹",
    description: "寒山寺是中国著名的佛教寺院，因唐代诗人张继的《枫桥夜泊》而闻名于世。寺内保存有大量的历史文物和佛教艺术品。",
    image: "/temple-images/寒山寺.webp",
    features: [
      "千古名刹，历史悠久",
      "《枫桥夜泊》诗境之地",
      "保存大量历史文物",
      "苏州园林式建筑",
      "新年钟声祈福活动"
    ],
    route: {
      transport: "高铁直达苏州站，地铁或公交可达",
      itinerary: "第一天：抵达苏州，入住酒店，游平江路；第二天：参观寒山寺、枫桥，品素斋；第三天：参访苏州园林，返程。",
      combination: "可与拙政园、虎丘等景点组合"
    },
    culture: [
      "佛教文化体验",
      "唐诗文化讲解",
      "苏州园林艺术鉴赏",
      "江南水乡文化体验",
      "新年钟声祈福"
    ],
    highlights: [
      "《枫桥夜泊》诗境之地",
      "苏州园林式建筑风格",
      "著名的新年钟声祈福活动"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "白马寺",
    location: "河南省洛阳市洛龙区白马寺镇",
    title: "中国第一古刹，佛教传入中国的第一座官办寺院",
    description: "白马寺是佛教传入中国后兴建的第一座官办寺院，有中国佛教的'祖庭'和'释源'之称，距今已有1900多年的历史。",
    image: "/temple-images/白马寺.jpg",
    features: [
      "中国第一古刹",
      "佛教传入中国的第一座官办寺院",
      "保存大量历史文物",
      "国际佛殿苑，汇聚各国佛教建筑",
      "洛阳牡丹文化节期间景色优美"
    ],
    route: {
      transport: "高铁直达洛阳站，公交或专车可达",
      itinerary: "第一天：抵达洛阳，入住酒店；第二天：参观白马寺、国际佛殿苑，品素斋；第三天：参观龙门石窟，返程。",
      combination: "可与龙门石窟、关林等景点组合"
    },
    culture: [
      "佛教文化体验",
      "中国佛教发展史讲解",
      "国际佛教建筑艺术鉴赏",
      "洛阳牡丹文化体验",
      "传统佛教仪式体验"
    ],
    highlights: [
      "中国第一古刹",
      "佛教传入中国的第一座官办寺院",
      "汇聚各国佛教建筑的国际佛殿苑"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 6,
    name: "塔尔寺",
    location: "青海省西宁市湟中区金塔路56号",
    title: "藏传佛教格鲁派六大寺院之一，宗喀巴大师诞生地",
    description: "塔尔寺是藏传佛教格鲁派六大寺院之一，也是宗喀巴大师的诞生地。寺内保存有大量的藏传佛教艺术品和珍贵文物。",
    image: "/temple-images/塔尔寺.webp",
    features: [
      "藏传佛教格鲁派六大寺院之一",
      "宗喀巴大师诞生地",
      "保存大量藏传佛教艺术品",
      "酥油花、壁画、堆绣被誉为'塔尔寺三绝'",
      "藏族文化体验丰富"
    ],
    route: {
      transport: "飞机直达西宁曹家堡机场，公交或专车可达",
      itinerary: "第一天：抵达西宁，入住酒店，适应高原气候；第二天：参观塔尔寺，体验藏族文化；第三天：参访青海湖，返程。",
      combination: "可与青海湖、茶卡盐湖等景点组合"
    },
    culture: [
      "藏传佛教文化体验",
      "宗喀巴大师生平讲解",
      "塔尔寺三绝艺术鉴赏",
      "藏族民俗文化体验",
      "高原自然风光体验"
    ],
    highlights: [
      "藏传佛教格鲁派六大寺院之一",
      "宗喀巴大师诞生地",
      "著名的'塔尔寺三绝'艺术"
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// 咨询预约数据
let consultationsData = [];

// 支付订单数据
let paymentsData = [];

// 模拟数据库操作
const mockDB = {
  // 寺庙相关
  temples: {
    find: () => Promise.resolve(templesData),
    findOne: (query) => {
      if (query.id) {
        const temple = templesData.find(t => t.id === query.id);
        return Promise.resolve(temple || null);
      }
      return Promise.resolve(null);
    },
    create: (data) => {
      const newTemple = {
        ...data,
        id: templesData.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      templesData.push(newTemple);
      return Promise.resolve(newTemple);
    },
    update: (query, data) => {
      const index = templesData.findIndex(t => t.id === query.id);
      if (index !== -1) {
        templesData[index] = {
          ...templesData[index],
          ...data,
          updatedAt: new Date().toISOString()
        };
        return Promise.resolve(templesData[index]);
      }
      return Promise.resolve(null);
    },
    delete: (query) => {
      const index = templesData.findIndex(t => t.id === query.id);
      if (index !== -1) {
        templesData.splice(index, 1);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    deleteMany: () => {
      templesData = [];
      return Promise.resolve({ deletedCount: true });
    }
  },
  
  // 咨询预约相关
  consultations: {
    find: (query = {}) => {
      let result = [...consultationsData];
      if (query.status) {
        result = result.filter(c => c.status === query.status);
      }
      if (query.templeId) {
        result = result.filter(c => c.templeId === query.templeId);
      }
      return Promise.resolve(result);
    },
    findById: (id) => {
      const consultation = consultationsData.find(c => c._id === id);
      return Promise.resolve(consultation || null);
    },
    create: (data) => {
      const newConsultation = {
        ...data,
        _id: `CONS${Date.now()}${Math.floor(Math.random() * 10000)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      consultationsData.push(newConsultation);
      return Promise.resolve(newConsultation);
    },
    findByIdAndUpdate: (id, data) => {
      const index = consultationsData.findIndex(c => c._id === id);
      if (index !== -1) {
        consultationsData[index] = {
          ...consultationsData[index],
          ...data,
          updatedAt: new Date().toISOString()
        };
        return Promise.resolve(consultationsData[index]);
      }
      return Promise.resolve(null);
    },
    findByIdAndDelete: (id) => {
      const index = consultationsData.findIndex(c => c._id === id);
      if (index !== -1) {
        consultationsData.splice(index, 1);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    aggregate: (pipeline) => {
      // 简单模拟聚合操作
      const stats = [];
      const statuses = ['pending', 'processing', 'completed', 'cancelled'];
      
      statuses.forEach(status => {
        const count = consultationsData.filter(c => c.status === status).length;
        if (count > 0) {
          stats.push({ _id: status, count });
        }
      });
      
      return Promise.resolve(stats);
    }
  },
  
  // 支付订单相关
  payments: {
    find: (query = {}) => {
      let result = [...paymentsData];
      if (query.status) {
        result = result.filter(p => p.status === query.status);
      }
      if (query.templeId) {
        result = result.filter(p => p.templeId === query.templeId);
      }
      return Promise.resolve(result);
    },
    findById: (id) => {
      const payment = paymentsData.find(p => p._id === id);
      return Promise.resolve(payment || null);
    },
    findOne: (query) => {
      if (query.transactionId) {
        const payment = paymentsData.find(p => p.transactionId === query.transactionId);
        return Promise.resolve(payment || null);
      }
      return Promise.resolve(null);
    },
    create: (data) => {
      const newPayment = {
        ...data,
        _id: `PAY${Date.now()}${Math.floor(Math.random() * 10000)}`,
        status: data.status || 'pending',
        transactionId: data.transactionId || `TXN${Date.now()}${Math.floor(Math.random() * 10000)}`,
        platform: data.platform || 'unknown',
        platformTransactionId: data.platformTransactionId || null,
        currency: data.currency || 'USD',
        paymentMethod: data.paymentMethod || 'online',
        paymentUrl: data.paymentUrl || null,
        refundAmount: data.refundAmount || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      paymentsData.push(newPayment);
      return Promise.resolve(newPayment);
    },
    findByIdAndUpdate: (id, data) => {
      const index = paymentsData.findIndex(p => p._id === id);
      if (index !== -1) {
        paymentsData[index] = {
          ...paymentsData[index],
          ...data,
          updatedAt: new Date().toISOString()
        };
        return Promise.resolve(paymentsData[index]);
      }
      return Promise.resolve(null);
    },
    findByIdAndDelete: (id) => {
      const index = paymentsData.findIndex(p => p._id === id);
      if (index !== -1) {
        paymentsData.splice(index, 1);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
    aggregate: (pipeline) => {
      // 简单模拟聚合操作
      const stats = [];
      const statuses = ['pending', 'processing', 'completed', 'failed'];
      
      statuses.forEach(status => {
        const payments = paymentsData.filter(p => p.status === status);
        if (payments.length > 0) {
          const count = payments.length;
          const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
          stats.push({ _id: status, count, totalAmount });
        }
      });
      
      return Promise.resolve(stats);
    }
  }
};

module.exports = mockDB;