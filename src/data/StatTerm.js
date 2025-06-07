const StatTerm = [
  {
    id: 1,
    term: "POS",
    meaning:
      "선수 포지션. PG(포인트 가드), SG(슈팅 가드), SF(스몰 포워드), PF(파워 포워드), C(센터)로 나뉩니다.",
  },
  {
    id: 2,
    term: "G",
    meaning: "출전 경기 수. 선수가 실제로 뛴 경기의 수입니다.",
  },
  {
    id: 3,
    term: "GS",
    meaning:
      "선발 출전 경기 수. 선수가 선발 라인업에 포함되어 출전한 경기 수입니다.",
  },
  {
    id: 4,
    term: "MP",
    meaning: "출전 시간. 경기당 평균 출전 시간을 의미합니다.",
  },
  {
    id: 5,
    term: "FG",
    meaning:
      "야투 성공 횟수. 2점 및 3점 슛을 포함한 전체 슛 중 성공한 횟수를 의미합니다.",
  },
  {
    id: 6,
    term: "FGA",
    meaning: "야투 시도 횟수. 전체 슛 시도 수(2점 + 3점)을 의미합니다.",
  },
  {
    id: 7,
    term: "FG%",
    meaning: "야투율. FG에서 FGA를 나눈 값으로, 전체 슛 성공률을 의미합니다.",
  },
  {
    id: 8,
    term: "3P",
    meaning: "3점슛 성공 횟수.",
  },
  {
    id: 9,
    term: "3PA",
    meaning: "3점슛 시도 횟수.",
  },
  {
    id: 10,
    term: "3P%",
    meaning: "3점 야투율. 3P에서 3PA를 나눈 값을 의미합니다.",
  },
  {
    id: 11,
    term: "2P",
    meaning: "2점 슛 성공 횟수.",
  },
  {
    id: 12,
    term: "2PA",
    meaning: "2점 슛 시도 횟수.",
  },
  {
    id: 13,
    term: "2P%",
    meaning: "2점 슛 야투율. 2P에서 2PA를 나눈 값을 의미합니다.",
  },
  {
    id: 14,
    term: "eFG%",
    meaning:
      "3점 슛 보정 슈팅효율성 수치. 3점 슛의 가치를 반영하여 계산된 야투율로, 공식은 eFG% = (FG + 0.5 x 3P) / FGA 입니다.",
  },
  {
    id: 15,
    term: "FT",
    meaning: "자유투 성공 횟수.",
  },
  {
    id: 16,
    term: "FTA",
    meaning: "자유투 시도 횟수.",
  },
  {
    id: 17,
    term: "FT%",
    meaning: "자유투 야투율. FT에서 FTA를 나눈 값을 의미합니다.",
  },
  {
    id: 18,
    term: "ORB",
    meaning:
      "경기당 평균 공격 리바운드. 공격 중 놓친 슛을 공격 팀이 잡은 리바운드 횟수를 의미합니다.",
  },
  {
    id: 19,
    term: "DRB",
    meaning:
      "경기당 평균 수비 리바운드. 상대팀의 슛 실패로 수비 팀이 잡은 리바운드 횟수를 의미합니다.",
  },
  {
    id: 20,
    term: "TRB",
    meaning:
      "경기당 평균 리바운드. 경기당 평균 총 리바운드로, ORB와 DRB의 합을 의미합니다.",
  },
  {
    id: 21,
    term: "AST",
    meaning: "경기당 평균 어시스트. 동료의 득점을 도운 패스 수를 의미합니다.",
  },
  {
    id: 22,
    term: "STL",
    meaning:
      "경기당 평균 스틸. 상대의 공격을 차단하여 공을 빼앗은 횟수를 의미합니다.",
  },
  {
    id: 22,
    term: "BLK",
    meaning:
      "경기당 평균 블록. 수비자가 반칙하지 않고 공격자가 슛한 공을 쳐내는 블록 횟수를 의미합니다.",
  },
  {
    id: 23,
    term: "TOV",
    meaning:
      "경기당 평균 턴오버. 공격 중 실수로 공을 잃은 횟수를 의미합니다. 이는 크게 핸들링 실패, 패스 실패, 공격자 반칙, 바이얼레이션으로 정의될 수 있습니다.",
  },
  {
    id: 24,
    term: "PF",
    meaning: "경기당 평균 파울 횟수.",
  },
  {
    id: 25,
    term: "PTS",
    meaning:
      "경기당 평균 득점. 총 득점을 출전 경기 수로 나눈 수치입니다. 일반적으로 2P x 2 + 3P x 3 + FT로 계산됩니다.",
  },
];

export default StatTerm;
