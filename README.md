## dataset

### user

key     | type
------  | -----
id      | string
password| string
name    | string
created | date

### song

key  | type 
-----| -----
data | string
owner| string(_id)
title| string

### logindata (res.session.user)

key  | type 
-----| -----
_id  | string(_id)
name | string



## api list

url                      |methods| return 
------------------------ |------ | -----
api/test                 |get    | test data
api/getInfo              |get    | 로그인 성공시 success: true 실패시 err : 1


url             |methods| return 
----------------|------ | -----
api/user/all    |get    | 유저리스트 전부
api/user/create |post   | 회원가입 id, password, name
api/user/login  |post   | 로그인   id, password
api/user/logout |post   | 로그아웃



url                      |methods| return 
------------------------ |------ | -----
api/song/get             |get    | 로그인유저의 곡
api/song/add             |post   | 로그인유저 곡 추가 title, data
api/song/modify/:song_id |put    | 로그인유저 곡제목 수정 title
api/song/delete/:song_id |delete | 로그인 유저 곡 삭제


## error list

error request 500 "something break

url|code|error
-------------------------|-------|--------
api/test                 ||추가예정
api/getInfo              ||
api/user/all             ||
api/user/create          ||
api/user/login           ||
api/user/logout          ||
api/song/get             ||
api/song/add             ||
api/song/modify/:song_id ||
api/song/delete/:song_id ||

