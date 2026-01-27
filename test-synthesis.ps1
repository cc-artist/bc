# 测试图片合成API
$testImagePath = Join-Path -Path (Get-Location) -ChildPath "cyber-buddha-blessing\backend\uploads\test.jpg"
$backendUrl = "http://localhost:5000/api/upload/synthesize"

# 检查测试图片是否存在
if (-not (Test-Path $testImagePath)) {
    Write-Host "测试图片不存在: $testImagePath" -ForegroundColor Red
    exit 1
}

Write-Host "测试图片: $testImagePath" -ForegroundColor Green
Write-Host "后端API: $backendUrl" -ForegroundColor Green
Write-Host "开始测试图片合成API..." -ForegroundColor Yellow

# 创建表单数据
$form = @{}
$form["image"] = Get-Item -Path $testImagePath

# 发送请求
try {
    $response = Invoke-RestMethod -Uri $backendUrl -Method POST -Form $form
    Write-Host "API调用成功！" -ForegroundColor Green
    Write-Host "响应数据:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "API调用失败！" -ForegroundColor Red
    Write-Host "错误详情:" -ForegroundColor Cyan
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails) {
        Write-Host $_.ErrorDetails.Message
    }
}