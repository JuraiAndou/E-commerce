--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-12-09 21:05:28

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 32853)
-- Name: categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categoria (
    id integer NOT NULL,
    descricao character varying NOT NULL
);


ALTER TABLE public.categoria OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 32858)
-- Name: CATEGORIA_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CATEGORIA_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."CATEGORIA_id_seq" OWNER TO postgres;

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 210
-- Name: CATEGORIA_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CATEGORIA_id_seq" OWNED BY public.categoria.id;


--
-- TOC entry 211 (class 1259 OID 32859)
-- Name: produto_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto_categoria (
    id_produto integer NOT NULL,
    id_categoria integer NOT NULL
);


ALTER TABLE public.produto_categoria OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 32862)
-- Name: PRODUTO_CATEGORIA_id_categoria_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_CATEGORIA_id_categoria_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_CATEGORIA_id_categoria_seq" OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 212
-- Name: PRODUTO_CATEGORIA_id_categoria_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_CATEGORIA_id_categoria_seq" OWNED BY public.produto_categoria.id_categoria;


--
-- TOC entry 213 (class 1259 OID 32863)
-- Name: PRODUTO_CATEGORIA_id_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_CATEGORIA_id_produto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_CATEGORIA_id_produto_seq" OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 213
-- Name: PRODUTO_CATEGORIA_id_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_CATEGORIA_id_produto_seq" OWNED BY public.produto_categoria.id_produto;


--
-- TOC entry 214 (class 1259 OID 32864)
-- Name: produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.produto (
    id integer NOT NULL,
    descricao character varying NOT NULL,
    preco double precision NOT NULL,
    foto json,
    quantidade integer NOT NULL
);


ALTER TABLE public.produto OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 32869)
-- Name: PRODUTO_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUTO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PRODUTO_id_seq" OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 215
-- Name: PRODUTO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUTO_id_seq" OWNED BY public.produto.id;


--
-- TOC entry 216 (class 1259 OID 32870)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying NOT NULL,
    user_adress character varying NOT NULL,
    user_email character varying NOT NULL,
    user_password character varying NOT NULL,
    user_admin boolean DEFAULT false NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 32876)
-- Name: USUARIO_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USUARIO_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."USUARIO_id_seq" OWNER TO postgres;

--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 217
-- Name: USUARIO_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USUARIO_id_seq" OWNED BY public.users.user_id;


--
-- TOC entry 218 (class 1259 OID 32877)
-- Name: venda_produto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda_produto (
    id_venda integer NOT NULL,
    id_produto integer NOT NULL,
    quantidade integer NOT NULL
);


ALTER TABLE public.venda_produto OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 32880)
-- Name: VENDA_PRODUTO_id_produto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VENDA_PRODUTO_id_produto_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."VENDA_PRODUTO_id_produto_seq" OWNER TO postgres;

--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 219
-- Name: VENDA_PRODUTO_id_produto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VENDA_PRODUTO_id_produto_seq" OWNED BY public.venda_produto.id_produto;


--
-- TOC entry 220 (class 1259 OID 32881)
-- Name: VENDA_PRODUTO_id_venda_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VENDA_PRODUTO_id_venda_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."VENDA_PRODUTO_id_venda_seq" OWNER TO postgres;

--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 220
-- Name: VENDA_PRODUTO_id_venda_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VENDA_PRODUTO_id_venda_seq" OWNED BY public.venda_produto.id_venda;


--
-- TOC entry 221 (class 1259 OID 32882)
-- Name: venda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.venda (
    id integer NOT NULL,
    data date NOT NULL,
    id_user integer NOT NULL,
    preco_final double precision NOT NULL
);


ALTER TABLE public.venda OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 32885)
-- Name: venda_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.venda_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.venda_id_seq OWNER TO postgres;

--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 222
-- Name: venda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.venda_id_seq OWNED BY public.venda.id;


--
-- TOC entry 3191 (class 2604 OID 32886)
-- Name: categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria ALTER COLUMN id SET DEFAULT nextval('public."CATEGORIA_id_seq"'::regclass);


--
-- TOC entry 3194 (class 2604 OID 32887)
-- Name: produto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto ALTER COLUMN id SET DEFAULT nextval('public."PRODUTO_id_seq"'::regclass);


--
-- TOC entry 3192 (class 2604 OID 32888)
-- Name: produto_categoria id_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria ALTER COLUMN id_produto SET DEFAULT nextval('public."PRODUTO_CATEGORIA_id_produto_seq"'::regclass);


--
-- TOC entry 3193 (class 2604 OID 32889)
-- Name: produto_categoria id_categoria; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria ALTER COLUMN id_categoria SET DEFAULT nextval('public."PRODUTO_CATEGORIA_id_categoria_seq"'::regclass);


--
-- TOC entry 3196 (class 2604 OID 32890)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public."USUARIO_id_seq"'::regclass);


--
-- TOC entry 3199 (class 2604 OID 32891)
-- Name: venda id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda ALTER COLUMN id SET DEFAULT nextval('public.venda_id_seq'::regclass);


--
-- TOC entry 3197 (class 2604 OID 32892)
-- Name: venda_produto id_venda; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto ALTER COLUMN id_venda SET DEFAULT nextval('public."VENDA_PRODUTO_id_venda_seq"'::regclass);


--
-- TOC entry 3198 (class 2604 OID 32893)
-- Name: venda_produto id_produto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto ALTER COLUMN id_produto SET DEFAULT nextval('public."VENDA_PRODUTO_id_produto_seq"'::regclass);


--
-- TOC entry 3201 (class 2606 OID 32895)
-- Name: categoria CATEGORIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categoria
    ADD CONSTRAINT "CATEGORIA_pkey" PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 32897)
-- Name: produto_categoria PRODUTO_CATEGORIA_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT "PRODUTO_CATEGORIA_pkey" PRIMARY KEY (id_produto, id_categoria);


--
-- TOC entry 3205 (class 2606 OID 32899)
-- Name: produto PRODUTO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto
    ADD CONSTRAINT "PRODUTO_pkey" PRIMARY KEY (id);


--
-- TOC entry 3207 (class 2606 OID 32901)
-- Name: users USUARIO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "USUARIO_pkey" PRIMARY KEY (user_id);


--
-- TOC entry 3209 (class 2606 OID 32903)
-- Name: venda_produto VENDA_PRODUTO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT "VENDA_PRODUTO_pkey" PRIMARY KEY (id_venda, id_produto);


--
-- TOC entry 3211 (class 2606 OID 32905)
-- Name: venda venda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda
    ADD CONSTRAINT venda_pkey PRIMARY KEY (id);


--
-- TOC entry 3212 (class 2606 OID 32906)
-- Name: produto_categoria id_categoria; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT id_categoria FOREIGN KEY (id_categoria) REFERENCES public.categoria(id);


--
-- TOC entry 3214 (class 2606 OID 32911)
-- Name: venda_produto id_produto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.venda_produto
    ADD CONSTRAINT id_produto FOREIGN KEY (id_produto) REFERENCES public.produto(id);


--
-- TOC entry 3213 (class 2606 OID 32916)
-- Name: produto_categoria id_produto; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.produto_categoria
    ADD CONSTRAINT id_produto FOREIGN KEY (id_produto) REFERENCES public.produto(id);


-- Completed on 2022-12-09 21:05:29

--
-- PostgreSQL database dump complete
--

