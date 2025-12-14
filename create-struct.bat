@echo off
echo Creating Angular app folder structure...

mkdir src\app\core\services
mkdir src\app\core\guards
mkdir src\app\core\interceptors
mkdir src\app\core\models

mkdir src\app\shared\components
mkdir src\app\shared\directives
mkdir src\app\shared\pipes

mkdir src\app\features\dashboard\components
mkdir src\app\features\dashboard\services
mkdir src\app\features\dashboard\models

mkdir src\app\features\messages\components
mkdir src\app\features\messages\services
mkdir src\app\features\messages\models

mkdir src\app\features\appointments\components
mkdir src\app\features\appointments\services
mkdir src\app\features\appointments\models

mkdir src\app\features\widget\components
mkdir src\app\features\widget\services
mkdir src\app\features\widget\models

mkdir src\app\app-shell
mkdir src\app\login

echo Folder structure created successfully!
pause
