#———— Jinja Bootsrap 4 -----------------
/Users/jack/Desktop/Wordspace/djk-sample 
python3 -m venv envsample 
source envsample/bin/activate
cd djk-sample
% python manage.py runserver 

#———————
mkdir logs
mkdir fixtures
python manage.py makemigrations club_app event_app
python manage.py migrate
python manage.py runserver
#———————
pip3 install -r dev-requirements.txt
pip3 install -U tox pip wheel setuptools
pip install selenium

#———run test————
python manage.py test
# https://viblo.asia/p/tim-hieu-testing-web-automation-voi-selenium-webdriver-va-python-Qbq5Q46RlD8
pip install selenium

#——fix selenium.common.exceptions.WebDriverException: Message: 'geckodriver' executable needs to be in PATH.——
https://stackoverflow.com/questions/40208051/selenium-using-python-geckodriver-executable-needs-to-be-in-path

brew install geckodriver
