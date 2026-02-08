const mongoose = require('mongoose');
const ServiceStatus = require('./models/ServiceStatus');
const Blessing = require('./models/Blessing');
const Temple = require('./models/Temple');
const Consultation = require('./models/Consultation');
const Payment = require('./models/Payment');
const APIDocument = require('./models/APIDocument');

// Load environment variables
require('dotenv').config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyber-buddha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  initData();
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

async function initData() {
  try {
    // Initialize ServiceStatus
    console.log('Initializing ServiceStatus...');
    const existingStatus = await ServiceStatus.findOne();
    if (!existingStatus) {
      const status = new ServiceStatus({
        backendService: 'running',
        frontendService: 'running',
        databaseConnection: 'connected',
        apiResponseTime: 23,
        cpuUsage: 32,
        memoryUsage: 45,
        diskSpace: 68
      });
      await status.save();
      console.log('ServiceStatus initialized successfully');
    } else {
      console.log('ServiceStatus already exists, skipping...');
    }

    // Initialize Blessing stats
    console.log('Initializing Blessing stats...');
    const existingBlessing = await Blessing.findOne();
    if (!existingBlessing) {
      const blessing = new Blessing({
        totalCount: 1234,
        todayCount: 45,
        thisWeekCount: 234,
        thisMonthCount: 892,
        distribution: {
          itemBlessing: 65,
          personalBlessing: 25,
          familyBlessing: 10
        }
      });
      await blessing.save();
      console.log('Blessing stats initialized successfully');
    } else {
      console.log('Blessing stats already exist, skipping...');
    }

    // Initialize Temples
    console.log('Initializing Temples...');
    const templeCount = await Temple.countDocuments();
    if (templeCount === 0) {
      const temples = [
        { name: '南华寺', location: '广东省韶关市', isActive: true },
        { name: '南普陀寺', location: '福建省厦门市', isActive: true },
        { name: '少林寺', location: '河南省登封市', isActive: true },
        { name: '灵隐寺', location: '浙江省杭州市', isActive: true },
        { name: '白马寺', location: '河南省洛阳市', isActive: true },
        { name: '大雁塔', location: '陕西省西安市', isActive: true },
        { name: '普陀山', location: '浙江省舟山市', isActive: true },
        { name: '峨眉山', location: '四川省乐山市', isActive: true },
        { name: '九华山', location: '安徽省池州市', isActive: true },
        { name: '五台山', location: '山西省忻州市', isActive: true },
        { name: '法门寺', location: '陕西省宝鸡市', isActive: true },
        { name: '天台山', location: '浙江省台州市', isActive: true },
        { name: '栖霞寺', location: '江苏省南京市', isActive: true },
        { name: '寒山寺', location: '江苏省苏州市', isActive: true },
        { name: '国清寺', location: '浙江省台州市', isActive: true },
        { name: '大相国寺', location: '河南省开封市', isActive: true },
        { name: '悬空寺', location: '山西省大同市', isActive: true },
        { name: '布达拉宫', location: '西藏自治区拉萨市', isActive: true }
      ];
      await Temple.insertMany(temples);
      console.log('Temples initialized successfully');
    } else {
      console.log('Temples already exist, skipping...');
    }

    // Initialize Consultations
    console.log('Initializing Consultations...');
    const consultationCount = await Consultation.countDocuments();
    if (consultationCount === 0) {
      const consultations = [
        {
          name: '张先生',
          content: '如何预约加持服务？',
          status: 'replied'
        },
        {
          name: '李女士',
          content: '加持的有效期是多久？',
          status: 'pending'
        },
        {
          name: '王先生',
          content: '可以为宠物加持吗？',
          status: 'pending'
        },
        {
          name: '刘先生',
          content: '加持费用是多少？',
          status: 'replied'
        },
        {
          name: '陈女士',
          content: '如何查看加持结果？',
          status: 'replied'
        },
        {
          name: '赵先生',
          content: '可以同时加持多个物品吗？',
          status: 'replied'
        },
        {
          name: '孙女士',
          content: '加持需要多长时间？',
          status: 'pending'
        }
      ];
      await Consultation.insertMany(consultations);
      console.log('Consultations initialized successfully');
    } else {
      console.log('Consultations already exist, skipping...');
    }

    // Initialize Payments
    console.log('Initializing Payments...');
    const paymentCount = await Payment.countDocuments();
    if (paymentCount === 0) {
      const payments = [
        {
          orderNumber: '20260207001',
          serviceType: 'itemBlessing',
          amount: 199,
          status: 'completed'
        },
        {
          orderNumber: '20260207002',
          serviceType: 'personalBlessing',
          amount: 299,
          status: 'completed'
        },
        {
          orderNumber: '20260206001',
          serviceType: 'familyBlessing',
          amount: 499,
          status: 'completed'
        },
        {
          orderNumber: '20260206002',
          serviceType: 'itemBlessing',
          amount: 199,
          status: 'completed'
        },
        {
          orderNumber: '20260205001',
          serviceType: 'personalBlessing',
          amount: 299,
          status: 'completed'
        }
      ];
      await Payment.insertMany(payments);
      console.log('Payments initialized successfully');
    } else {
      console.log('Payments already exist, skipping...');
    }

    // Initialize API Documents
    console.log('Initializing API Documents...');
    const apiDocCount = await APIDocument.countDocuments();
    if (apiDocCount === 0) {
      const apiDocs = [
        {
          method: 'GET',
          endpoint: '/api/health',
          description: '健康检查接口',
          details: '检查服务器运行状态'
        },
        {
          method: 'POST',
          endpoint: '/api/bless',
          description: '申请加持服务',
          details: '提交加持申请，生成加持结果'
        },
        {
          method: 'GET',
          endpoint: '/api/blessings/:id',
          description: '获取加持结果',
          details: '根据ID获取加持结果和证书'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/dashboard',
          description: '获取仪表盘数据',
          details: '获取管理后台仪表盘统计数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/status',
          description: '获取系统状态',
          details: '获取系统运行状态数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/blessings',
          description: '获取加持统计',
          details: '获取加持服务统计数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/temples',
          description: '获取寺庙列表',
          details: '获取寺庙管理数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/consultations',
          description: '获取咨询列表',
          details: '获取咨询管理数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/payments',
          description: '获取支付列表',
          details: '获取支付管理数据'
        },
        {
          method: 'GET',
          endpoint: '/api/admin/api-docs',
          description: '获取API文档',
          details: '获取API接口文档数据'
        }
      ];
      await APIDocument.insertMany(apiDocs);
      console.log('API Documents initialized successfully');
    } else {
      console.log('API Documents already exist, skipping...');
    }

    console.log('All data initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}
