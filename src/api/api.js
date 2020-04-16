import axios from 'axios';

let base = '';

// let ownbase ='http://xyj.grapefruitcloud.com' //外网接口

var href = window.location.href
if (href.indexOf('xyj.grapefruitcloud.com') >= 0) {
    var ownbase = 'http://xyj.grapefruitcloud.com' //PHP服务域名
} else {
    var ownbase = 'http://zzb.onezen.net' //PHP服务域名
}


// export default {
//     customData: function() {
//         return ownbase;
//     }

// }

export const hostUrl = ownbase;

//2019/11/21
//登录
export const requestLoginOwn = params => { return axios.post(`${ownbase}/admin/system/login`, params).then(res => res.data); };

//获取添加用户列表
export const userlist = params => { return axios.post(`${ownbase}/admin/system/userlist`, params).then(res => res.data); };

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
//批量启用，禁用，删除，
export const userctrl = params => { return axios.post(`${ownbase}/admin/system/userctrl`, params).then(res => res.data); };

//用户
//查询用户详情
export const ptfs_query_user_list = params => { return axios.post(`${ownbase}/account/ptfs_query_user_list `, params).then(res => res.data); };
export const ptfs_query_list_user_store_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_list_user_store_list `, params).then(res => res.data); };
//export const ptfs_query_node_info_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_info_list `, params).then(res => res.data); };
export const ptfs_query_user_total_profit_everyday = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_total_profit_everyday `, params).then(res => res.data); };
//用户存储力列表查询
export const ptfs_query_user_store_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_store_list `, params).then(res => res.data); };
//冻结/解冻用户
export const ptfs_forbid_users = params => { return axios.post(`${ownbase}/account/ptfs_forbid_users `, params).then(res => res.data); };
//查询绑定用户数
export const query_binded_user_cnt = params => { return axios.post(`${ownbase}/miner_ctrl/query_binded_user_cnt `, params).then(res => res.data); };

//新增

//app 应用管理
//APP 分包上传
export const uploadzip = params => { return axios.post(`${ownbase}/admin/uploadzip `, params).then(res => res.data); };
//APP 更新日志列表
export const applogList = params => { return axios.post(`${ownbase}/PTFSLogSys/applogList `, params).then(res => res.data); };
//新增App更新包,APP确认上传
export const savePacket = params => { return axios.post(`${ownbase}/packet/savePacket `, params).then(res => res.data); };
//获取APP更新包列表
export const queryPacket = params => { return axios.post(`${ownbase}/packet/queryPacket `, params).then(res => res.data); };



//添加用户
export const userinsert = params => { return axios.post(`${ownbase}/admin/system/userinsert`, params).then(res => res.data); };
//更新用户
export const userupdate = params => { return axios.post(`${ownbase}/admin/system/userupdate`, params).then(res => res.data); };


//删除用户列表
export const userdelete = params => { return axios.post(`${ownbase}/admin/system/userdelete`, params).then(res => res.data); };
//路由列表获取
export const menulistfortree = params => { return axios.post(`${ownbase}/admin/system/menulistfortree`, params).then(res => res.data); };
//用户权限列表
export const rolelist = params => { return axios.post(`${ownbase}/admin/system/rolelist`, params).then(res => res.data); };
//用户权限修改
export const roleupdate = params => { return axios.post(`${ownbase}/admin/system/roleupdate`, params).then(res => res.data); };
//权限下拉列表
export const rolelistfortop = params => { return axios.post(`${ownbase}/admin/system/rolelistfortop`, params).then(res => res.data); };
//新增权限
export const roleinsert = params => { return axios.post(`${ownbase}/admin/system/roleinsert`, params).then(res => res.data); };
//栓除权限列表
export const roledelete = params => { return axios.post(`${ownbase}/admin/system/roledelete`, params).then(res => res.data); };
//新增菜单
export const menuinsert = params => { return axios.post(`${ownbase}/admin/system/menuinsert`, params).then(res => res.data); };
//更新菜单
export const menuupdate = params => { return axios.post(`${ownbase}/admin/system/menuupdate`, params).then(res => res.data); };
//删除菜单
export const menudelete = params => { return axios.post(`${ownbase}/admin/system/menudelete`, params).then(res => res.data); };



//更新权限
// export const roleupdate = params => { return axios.post(`${ownbase}/admin/system/roleupdate`, params).then(res => res.data); };

//推送即时消息
 export const pushImmediate = params => { return axios.post(`${ownbase}/noticepush/push_immediate`, params).then(res => res.data); };
//推送定时消息
export const pushOntimer = params => { return axios.post(`${ownbase}/noticepush/push_on_timer`, params).then(res => res.data); };
//查询历史推送消息
export const query_push_history_list = params => { return axios.post(`${ownbase}/noticepush/query_push_history_list`, params).then(res => res.data); };
//撤回推送消息
export const delete_push_on_timer = params => { return axios.post(`${ownbase}/noticepush/delete_push_on_timer`, params).then(res => res.data); };
//图片上传
export const saveimage = params => { return axios.post(`${ownbase}/cloud/saveimage`, params).then(res => res.data); };
//富文本编辑
export const savehtml = params => { return axios.post(`${ownbase}/cloud/savehtml`, params).then(res => res.data); };

//通知详情
export const getnotice = params => { return axios.post(`${ownbase}/noticepush/getnotice`, params).then(res => res.data); };



//西柚机系统管理
//测试文件上传
export const updateNodeConfigtest = params => { return axios.post(`${ownbase}/admin/upload`, params).then(res => res.data); };
//系统管理获取数据列表
export const queryRom = params => { return axios.post(`${ownbase}/overview/queryRom`, params).then(res => res.data); };
//系统管理确定上传保存数据
export const saveRom = params => { return axios.post(`${ownbase}/overview/saveRom`, params).then(res => res.data); };
//系统管理删除数据
export const deleteRom = params => { return axios.post(`${ownbase}/overview/deleteRom`, params).then(res => res.data); };
//修改包数据查询单条数据信息
export const findRomById = params => { return axios.post(`${ownbase}/overview/findRomById`, params).then(res => res.data); };
//修改包数据确定修改
export const updateRom = params => { return axios.post(`${ownbase}/overview/updateRom`, params).then(res => res.data); };
//发布查询要发布版本的信息
export const getpacketbyversion = params => { return axios.post(`${ownbase}/overview/getpacketbyversion`, params).then(res => res.data); };

//发布方式修改
export const updateMod = params => { return axios.post(`${ownbase}/overview/updateMod`, params).then(res => res.data); };


//西柚机操作记录
export const actionlog = params => { return axios.post(`${ownbase}/PTFSLogSys/actionlog2`, params).then(res => res.data); };
//上传到PTFS节点
export const uploadpfts = params => { return axios.post(`${ownbase}/overview/uploadpfts`, params).then(res => res.data); };



//ROM 升级
//发布版本列表* 
export const publishlistRom = params => { return axios.post(`${ownbase}/overview/publishlist`, params).then(res => res.data); };
//当前发布版本
export const versionlistRom = params => { return axios.post(`${ownbase}/overview/versionlist`, params).then(res => res.data); };
//发布查询版本
export const getversionRom = params => { return axios.post(`${ownbase}/overview/getversion`, params).then(res => res.data); };
//确定发布
export const publishRom = params => { return axios.post(`${ownbase}/overview/publish`, params).then(res => res.data); };
// //撤回发布
// export const publishRom = params => { return axios.post(`${ownbase}/overview/publish`, params).then(res => res.data); };

//撤销发布的版本、
export const rollbackRom = params => { return axios.post(`${ownbase}/overview/rollback`, params).then(res => res.data); };

//ROM发布清单
export const publishuserRom = params => { return axios.post(`${ownbase}/overview/publishuser`, params).then(res => res.data); };








//	在线节点数
export const queryOnlineNodeHistgraphs = params => { return axios.post(`${ownbase}/overview/queryOnlineNodeHistgraph`, params).then(res => res.data); };
//实际存储数据量
export const queryStoreUsageHistgraph = params => { return axios.post(`${ownbase}/overview/queryStoreUsageHistgraph`, params).then(res => res.data); };

//tilte显示数量
export const querySummary = params => { return axios.post(`${ownbase}/overview/querySummary`, params).then(res => res.data); };

//存储量/存储空间  
export const queryDevStoreHistgraph = params => { return axios.post(`${ownbase}/overview/queryDevStoreHistgraph`, params).then(res => res.data); };
//存储文件数

export const queryFileCntHistgraph = params => { return axios.post(`${ownbase}/overview/queryFileCntHistgraph`, params).then(res => res.data); };
//文件查询
export const queryFileSummaryByConditions = params => { return axios.post(`${ownbase}/PTFSFileManage/queryFileSummaryByConditions`, params).then(res => res.data); };

//文件查看详情
export const queryOneFileBackupOwnerRecords = params => { return axios.post(`${ownbase}/PTFSFileManage/queryOneFileBackupOwnerRecords`, params).then(res => res.data); };

//黑名单查询
export const queryBlackListByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/queryBlackListByCondition`, params).then(res => res.data); };

//文件查看详情删除
export const deleteFileList = params => { return axios.post(`${ownbase}/PTFSFileManage/deleteFileList`, params).then(res => res.data); };
//文件查看备份
export const backupFileByCondition = params => { return axios.post(`${ownbase}/PTFSFileManage/backupFileByCondition`, params).then(res => res.data); };

//黑名单添加
export const addNewForbiddenFile = params => { return axios.post(`${ownbase}/PTFSFileManage/addNewForbiddenFile`, params).then(res => res.data); };

//黑名单批量添加
export const uploadBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/uploadBlackListFile`, params).then(res => res.data); };

//黑名单删除
export const updateBlackListFile = params => { return axios.post(`${ownbase}/PTFSFileManage/updateBlackListFile`, params).then(res => res.data); };

//地图节点查询
export const queryMinerGeographDist = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryMinerGeographDist`, params).then(res => res.data); };

//页面加载进来节点详细信息
export const queryOneCityMinerDistDetails = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryOneCityMinerDistDetails`, params).then(res => res.data); };
export const queryAllNodeProfiesByNodeTypes = params => { return axios.post(`${ownbase}/overview/queryAllNodeProfiesByNodeTypes`, params).then(res => res.data); };




//单个节点详细信息
export const queryNodeStoredFileListByNodeId = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeStoredFileListByNodeId`, params).then(res => res.data); };

//单个节点概览信息查询
export const queryNodeInfoById = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryNodeInfoById`, params).then(res => res.data); };

//修改节点配置
export const queryAllConfigRecords = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllConfigRecords`, params).then(res => res.data); };

//新增节点配置更新
export const updateNodeConfig = params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//更新节点配置上传
//export const updateNodeConfig= params => { return axios.post(`${ownbase}/PTFSFileManage/updateNodeConfig`, params).then(res => res.data); };

//分区分组信息展示
export const queryRegionGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryRegionGroupInfo`, params).then(res => res.data); };
//分区分组点击组数查看i详情
export const queryGroupInfo = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryGroupInfo`, params).then(res => res.data); };

//缓存，备份更新后
export const queryAllNodesProfiles = params => { return axios.post(`${ownbase}/PTFSNodeManage/queryAllNodesProfiles`, params).then(res => res.data); };

//日志查看
export const showNodeNetworkLogs = params => { return axios.post(`${ownbase}/PTFSLogSys/showNodeNetworkLogs`, params).then(res => res.data); };
//日志类型数据获取
export const queryLogTypes = params => { return axios.get(`${ownbase}/PTFSLogSys/queryLogTypes`, params).then(res => res.data); };
//删除要清空的日志列表
export const deleteHistoryDatas = params => { return axios.post(`${ownbase}/PTFSLogSys/deleteHistoryDatas`, params).then(res => res.data); };

//操作日志
export const setactionlog = params => { return axios.post(`${ownbase}/PTFSLogSys/setactionlog`, params).then(res => res.data); };
//操作设置
export const setactionlogAll = params => { return axios.post(`${ownbase}/cloudterminal/setactionlog`, params).then(res => res.data) };
//操作日志列表获取
export const actionlogactive = params => { return axios.post(`${ownbase}/cloudterminal/actionlog`, params).then(res => res.data) };













//西柚机应用管理
//西柚机应用管理上传
export const saveapp = params => { return axios.post(`${ownbase}/app/saveapp`, params).then(res => res.data); };
//西柚机应用管理获取APK文件信息
export const uploadapk = params => { return axios.post(`${ownbase}/admin/uploadapk`, params).then(res => res.data); };

//应用管理查询列表
export const applist = params => { return axios.post(`${ownbase}/app/applist`, params).then(res => res.data); };
//应用发布管理查询列表
export const appdevicelist = params => { return axios.post(`${ownbase}/app/devicelist`, params).then(res => res.data); };

//App文件上传到ipfs节点
export const uploadpftsNew = params => { return axios.post(`${ownbase}/packet/uploadpfts`, params).then(res => res.data); };
//APP 修改描述
export const editDescription = params => { return axios.post(`${ownbase}/packet/editDescription`, params).then(res => res.data); };
//APP删除升级包
export const deletePacket = params => { return axios.post(`${ownbase}/packet/deletePacket`, params).then(res => res.data); };
//APP历史发布记录
export const publishlistApp = params => { return axios.post(`${ownbase}/packet/publishlist`, params).then(res => res.data); };
//APP 发布
export const publishApp = params => { return axios.post(`${ownbase}/packet/publish`, params).then(res => res.data); };
//发布版本列表
export const getversionApp = params => { return axios.post(`${ownbase}/packet/getversion`, params).then(res => res.data); };
//APP灰度全网发布
export const versionlistNew = params => { return axios.post(`${ownbase}/packet/versionlist`, params).then(res => res.data); };
//APP发布清单
export const publishuser = params => { return axios.post(`${ownbase}/packet/publishuser`, params).then(res => res.data); };
//APP





//数据分析
/* APP用户分析*/
export const ptfs_query_user_trend_list = params => { return axios.post(`${ownbase}/account/ptfs_query_user_trend_list `, params).then(res => res.data); };
/** 设备在线/离线分析*/
export const device_online_curve = params => { return axios.post(`${ownbase}/grapefruit_analyse/device_online_curve `, params).then(res => res.data); };
/** 设备在线离线表格*/
export const device_online_table = params => { return axios.post(`${ownbase}/grapefruit_analyse/device_online_table `, params).then(res => res.data); };
/**饼图及右侧条状图 */
export const app_version_dist_curve = params => { return axios.post(`${ownbase}/grapefruit_analyse/app_version_dist_curve `, params).then(res => res.data); };
/**版本分析--表格 */
export const app_version_dist_table = params => { return axios.post(`${ownbase}/grapefruit_analyse/app_version_dist_table `, params).then(res => res.data); };
/**版本在线分布图*/
export const app_version_online_dist = params => { return axios.post(`${ownbase}/grapefruit_analyse/app_version_online_dist `, params).then(res => res.data); };
/**地图及侧面表格 */
export const app_usage_region_dist = params => { return axios.post(`${ownbase}/grapefruit_analyse/app_usage_region_dist `, params).then(res => res.data); };





//2019-11-21
//西柚机设备信息
export const devicelist = params => { return axios.post(`${ownbase}/miner_ctrl/query_devinfo_by_conditions_grapefruit`, params).then(res => res.data); };
//西柚机设备    title查询
export const device_cnt_overview = params => { return axios.post(`${ownbase}/miner_ctrl/device_cnt_overview`, params).then(res => res.data); };
//西柚机设备激活   table查询
export const query_devinfo_by_conditions = params => { return axios.post(`${ownbase}/miner_ctrl/query_devinfo_by_conditions`, params).then(res => res.data); };
//西柚机设备激活   解绑
export const change_device_bind_state = params => { return axios.post(`${ownbase}/miner_ctrl/change_device_bind_state2`, params).then(res => res.data); };
//西柚机设备激活   新建设备
export const import_node_basicinfo = params => { return axios.post(`${ownbase}/miner_ctrl/import_node_basicinfo`, params).then(res => res.data); };
//西柚机设备激活   删除
export const delete_device_basicinfo = params => { return axios.post(`${ownbase}/miner_ctrl/delete_device_basicinfo`, params).then(res => res.data); };
//西柚机设备激活   编辑
export const edit_device_basicinfo = params => { return axios.post(`${ownbase}/miner_ctrl/edit_device_basicinfo`, params).then(res => res.data); };
//西柚机设备激活   关机/重启 
export const ctrl_node_state = params => { return axios.post(`${ownbase}/miner_ctrl/ctrl_node_state2`, params).then(res => res.data); };
//西柚机设备算力  table查询
//export const getDevicePower = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_info_list`, params).then(res => res.data); };
//西柚机设备算力   调整算力系数
// export const set_earn_param = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_earn_param`, params).then(res => res.data); };
//设备激活
export const chg_device_state = params => { return axios.post(`${ownbase}/miner_ctrl/chg_device_state`, params).then(res => res.data); };

2019-11-23
//积分管理   积分明细
export const query_user_total_profit_everyday = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_total_profit_everyday`, params).then(res => res.data); };
//积分管理   收益明细
export const query_node_info_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_info_list`, params).then(res => res.data); };

//西柚机存储明细




//应用发布应用列表获取
export const applistfortree = params => { return axios.post(`${ownbase}/app/applistfortree`, params).then(res => res.data); };
//应用发布应用对应版本列表获取
export const verlistfortree = params => { return axios.post(`${ownbase}/app/verlistfortree`, params).then(res => res.data); };
//应用发布执行下发指令
export const devicectrl = params => { return axios.post(`${ownbase}/app/devicectrl`, params).then(res => res.data); };

//设备SN查看详情
export const getappbydev = params => { return axios.post(`${ownbase}/app/getappbydev`, params).then(res => res.data); };
//获取设备型号
export const getmactype = params => { return axios.post(`${ownbase}/app/getmactype`, params).then(res => res.data); };

//设备型号入库
export const savedevice = params => { return axios.post(`${ownbase}/device/savedevice`, params).then(res => res.data); };


//echars图标获取已完成应用的饼状数据图
export const getappstatistics = params => { return axios.post(`${ownbase}/app/getappstatistics `, params).then(res => res.data); };


//西柚机设备监控
//所有设备数据查询
export const query_general_info_list = params => { return axios.post(`${ownbase}/dev_status/query_general_info_list `, params).then(res => res.data); };
//获取设备最新状态
export const query_node_info = params => { return axios.post(`${ownbase}/dev_status/query_node_info `, params).then(res => res.data); };

//单个设备详情
export const query_detail_info_list = params => { return axios.post(`${ownbase}/dev_status/query_detail_info_list `, params).then(res => res.data); };

//IPFS业务数据统计
//设备热度分布
export const query_device_region_distribution = params => { return axios.post(`${ownbase}/bg_manager_tool/query_device_region_distribution `, params).then(res => res.data); };
//查询当天 top10 拉取次数排行榜
export const query_resource_export_rank = params => { return axios.post(`${ownbase}/bg_manager_tool/query_resource_export_rank `, params).then(res => res.data); };
//查询当天 top10 拉取流量的设备排行榜
export const query_stream_export_rank = params => { return axios.post(`${ownbase}/bg_manager_tool/query_stream_export_rank `, params).then(res => res.data); };
//根据条件，查询当\前设备统计明细
export const query_device_details = params => { return axios.post(`${ownbase}/bg_manager_tool/query_device_details `, params).then(res => res.data); };


//西柚机用户信息
//查询用户统计信息
export const ptfs_query_total_users = params => { return axios.post(`${ownbase}/account/ptfs_query_total_users `, params).then(res => res.data); };



//用户管理存储力气管理
export const ptfs_total_profit_info = params => { return axios.post(`${ownbase}/miner_earn/ptfs_total_profit_info `, params).then(res => res.data); };


//用户收益统计
//查看用户收益列表
export const ptfs_query_user_profit_info = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_profit_info `, params).then(res => res.data); };




//渠道统计
//渠道数据总览
export const query_3rd_stream_overview = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_stream_overview `, params).then(res => res.data); };
//渠道容量流量统计
export const query_3rd_capacity_stream_overview = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_capacity_stream_overview `, params).then(res => res.data); };
//渠道容量流量明细
export const query_3rd_capacity_stream_details = params => { return axios.post(`${ownbase}/bg_manager_tool/query_3rd_capacity_stream_details `, params).then(res => res.data); };

//文件统计
//文件热度分布
export const city_heat = params => { return axios.post(`${ownbase}/file_bgmgr/city_heat `, params).then(res => res.data); };
 // 下载排名
 export const file_dl_range = params => { return axios.post(`${ownbase}/file_bgmgr/file_dl_range `, params).then(res => res.data); };
//时间热度
export const time_heat = params => { return axios.post(`${ownbase}/file_bgmgr/time_heat `, params).then(res => res.data); };
//文件总览
export const file_outline = params => { return axios.post(`${ownbase}/file_bgmgr/file_outline `, params).then(res => res.data); };
//查询文件存储
export const file_store = params => { return axios.post(`${ownbase}/file_bgmgr/file_store `, params).then(res => res.data); };
//文件上传明细
export const file_dlinfo = params => { return axios.post(`${ownbase}/file_bgmgr/file_dlinfo `, params).then(res => res.data); };

//西柚机系统管理 
//查询备用地址配置
export const query_domain_list = params => { return axios.post(`${ownbase}/domain/query_domain_list `, params).then(res => res.data); };

//修改备用地址配置
export const modify_domain_list = params => { return axios.post(`${ownbase}/domain/modify_domain_list `, params).then(res => res.data); };

//PTFS节点管理
//节点控制台
export const send_ptfs_cmd = params => { return axios.post(`${ownbase2}/bg_manager_tool/send_ptfs_cmd`, params).then(res => res.data); };
export const query_ptfs_cmd_result = params => { return axios.post(`${ownbase}/bg_manager_tool/query_ptfs_cmd_result`, params).then(res => res.data); };

//20200416 设备绑定输入ID新增
export const web_change_device_state = params => { return axios.post(`${ownbase}/miner_ctrl/web_change_device_state `, params).then(res => res.data); };




//20200319新增
//
export const ptfs_query_node_grade = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_grade `, params).then(res => res.data); };
//
export const ptfs_query_con_value_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_con_value_list `, params).then(res => res.data); };
//
export const ptfs_get_con_param_add = params => { return axios.post(`${ownbase}/miner_earn/ptfs_get_con_param_add `, params).then(res => res.data); };
//
export const ptfs_get_con_param_dec = params => { return axios.post(`${ownbase}/miner_earn/ptfs_get_con_param_dec `, params).then(res => res.data); };
//
export const ptfs_set_con_param_add = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_con_param_add `, params).then(res => res.data); };
//
export const ptfs_set_con_param_dec = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_con_param_dec `, params).then(res => res.data); };

//
export const ptfs_query_cp_value_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_cp_value_list `, params).then(res => res.data); };
//
export const ptfs_query_node_info_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_node_info_list `, params).then(res => res.data); };
//
export const ptfs_get_com_power_scale = params => { return axios.post(`${ownbase}/miner_earn/ptfs_get_com_power_scale `, params).then(res => res.data); };
//
export const ptfs_get_com_power_add = params => { return axios.post(`${ownbase}/miner_earn/ptfs_get_com_power_add `, params).then(res => res.data); };
//
export const ptfs_get_com_power_dec = params => { return axios.post(`${ownbase}/miner_earn/ptfs_get_com_power_dec `, params).then(res => res.data); };

//
export const ptfs_set_com_power_scale = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_com_power_scale `, params).then(res => res.data); };
//
export const ptfs_set_com_power_add = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_com_power_add `, params).then(res => res.data); };
//
export const ptfs_set_com_power_dec = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_com_power_dec `, params).then(res => res.data); };
//
export const ptfs_query_user_profit_list = params => { return axios.post(`${ownbase}/miner_earn/ptfs_query_user_profit_list `, params).then(res => res.data); };
//
export const ptfs_set_earn_param = params => { return axios.post(`${ownbase}/miner_earn/ptfs_set_earn_param `, params).then(res => res.data); };


//帮助中心
//新建
export const create_help_cat_info = params => { return axios.post(`${ownbase}/miner_ctrl/create_help_cat_info `, params).then(res => res.data); };
//查询
export const query_help_cat_info = params => { return axios.post(`${ownbase}/miner_ctrl/query_help_cat_info `, params).then(res => res.data); };
//修改
export const modify_help_cat_info = params => { return axios.post(`${ownbase}/miner_ctrl/modify_help_cat_info `, params).then(res => res.data); };
//删除
export const delete_help_cat_info = params => { return axios.post(`${ownbase}/miner_ctrl/delete_help_cat_info `, params).then(res => res.data); };

//内容管理
//查询
export const query_help_item_info = params => { return axios.post(`${ownbase}/miner_ctrl/query_help_item_info `, params).then(res => res.data); };
//新增
export const create_help_item_info = params => { return axios.post(`${ownbase}/miner_ctrl/create_help_item_info `, params).then(res => res.data); };
//删除
export const delete_help_item_info = params => { return axios.post(`${ownbase}/miner_ctrl/delete_help_item_info `, params).then(res => res.data); };
//修改
export const modify_help_item_info = params => { return axios.post(`${ownbase}/miner_ctrl/modify_help_item_info `, params).then(res => res.data); };

 
//应用市场
//APP列表
export const get_all_app = params => { return axios.post(`${ownbase}/appmarket/get_all_app `, params).then(res => res.data); };
//上架
export const app_on = params => { return axios.post(`${ownbase}/appmarket/app_on `, params).then(res => res.data); };

//x下架
export const app_off = params => { return axios.post(`${ownbase}/appmarket/app_off`, params).then(res => res.data); };
//新增app
export const add_app = params => { return axios.post(`${ownbase}/appmarket/add_app`, params).then(res => res.data); };
//查询APP详请
export const get_app_by_appid = params => { return axios.post(`${ownbase}/appmarket/get_app_by_appid`, params).then(res => res.data); };
//更新APP信息
export const update_app = params => { return axios.post(`${ownbase}/appmarket/update_app`, params).then(res => res.data); };


//查询分组列表
export const query_all_group = params => { return axios.post(`${ownbase}/appmarket/query_all_group`, params).then(res => res.data); };
//添加组
export const add_group = params => { return axios.post(`${ownbase}/appmarket/add_group`, params).then(res => res.data); };
//获取关联应用
export const get_app = params => { return axios.post(`${ownbase}/appmarket/get_app`, params).then(res => res.data); };

//删除组
export const del_group = params => { return axios.post(`${ownbase}/appmarket/del_group`, params).then(res => res.data); };

//新增多张照片
export const saveimagemore = params => { return axios.post(`${ownbase}/cloud/saveimagemore`, params).then(res => res.data); };

//更新应用分组
export const update_group = params => { return axios.post(`${ownbase}/appmarket/update_group`, params).then(res => res.data); };




 







