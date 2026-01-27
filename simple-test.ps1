# 简单测试图片合成API
Write-Host "开始测试图片合成API..." -ForegroundColor Yellow

# 定义参数
$testImagePath = "D:\Trae CN\Buddha s consecration 2\cyber-buddha-blessing\backend\uploads\test.jpg"
$backendUrl = "http://localhost:5000/api/upload/synthesize"

# 检查测试图片
if (-not (Test-Path $testImagePath)) {
    Write-Host "测试图片不存在: $testImagePath" -ForegroundColor Red
    exit 1
}

Write-Host "测试图片: $testImagePath" -ForegroundColor Green
Write-Host "后端API: $backendUrl" -ForegroundColor Green

# 发送请求
try {
    $response = Invoke-RestMethod -Uri $backendUrl -Method POST -Form @{image=(Get-Item $testImagePath)}
    Write-Host "API调用成功！" -ForegroundColor Green
    Write-Host "响应: $($response | ConvertTo-Json -Depth 3)" -ForegroundColor Cyan
} catch {
    Write-Host "API调用失败！" -ForegroundColor Red
    Write-Host "错误: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "详细错误: $($_.ErrorDetails.Message)" -ForegroundColor Cyan
    }
}